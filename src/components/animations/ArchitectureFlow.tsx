"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Play,
  Radio,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { useInView } from "./use-in-view";

interface ArchitectureNode {
  id: string;
  name: string;
  visualOrder: number;
  flowRole: string;
  layer: string;
  swiftType: string;
  responsibilities: readonly string[];
  refusesToOwn: readonly string[];
  dataFlowIn: string;
  dataFlowOut: string;
  architecturalDecisions: string;
  validationBoundaries: string;
  codeSnippet: string;
}

const ARCHITECTURE_NODES: readonly ArchitectureNode[] = [
  {
    id: "user-action",
    name: "User Action",
    visualOrder: 1,
    flowRole: "Trigger & Intent Initiation",
    layer: "USER INTERACTION",
    swiftType: "Button, Pull-to-Refresh, Gesture",
    responsibilities: [
      "Captures raw user intent (e.g. pull-to-refresh, button tap)",
      "Dispatches intent to View via SwiftUI action bindings",
      "Provides immediate haptic or visual touch response",
    ],
    refusesToOwn: [
      "Zero business rules or validation logic",
      "No state persistence or network access",
    ],
    dataFlowIn: "Physical screen tap, drag gesture, or navigation deep-link",
    dataFlowOut: "UserIntent enum or action closure dispatch",
    architecturalDecisions:
      "Decoupling user intent from presentation logic ensures gestures can be triggered programmatically in XCUITest or snapshot suites without modifying business code.",
    validationBoundaries:
      "Touch target boundary (44x44pt HIG minimum), debouncing rapid double-taps to prevent duplicate requests.",
    codeSnippet: `// 1. User Action in Declarative SwiftUI
Button(action: {
    // Dispatches user intent asynchronously
    Task { await viewModel.handleIntent(.refreshTransactions) }
}) {
    Label("Refresh Account", systemImage: "arrow.clockwise")
}
.disabled(viewModel.state.isLoading) // Debounce interaction while in flight`,
  },
  {
    id: "view",
    name: "View Layer",
    visualOrder: 2,
    flowRole: "Declarative Presentation",
    layer: "PRESENTATION",
    swiftType: "SwiftUI View / UIViewController",
    responsibilities: [
      "Renders current ViewState declaratively",
      "Binds lifecycle triggers (.task, .onDisappear)",
      "Adheres strictly to Dynamic Type and accessibility guidelines",
    ],
    refusesToOwn: [
      "No direct URLSession or networking calls",
      "No domain business calculations or raw data storage",
    ],
    dataFlowIn: "ViewState snapshot from ViewModel",
    dataFlowOut: "User intents passed to ViewModel; navigation intents to Coordinator",
    architecturalDecisions:
      "Views remain pure renderers driven by immutable state snapshots. Swapping a UIKit UIViewController for a SwiftUI View does not touch business rules or network services.",
    validationBoundaries:
      "Layout boundary, Dynamic Type accessibility budgets, VoiceOver accessibility elements.",
    codeSnippet: `// 2. Pure Presentation View
struct AccountSummaryView: View {
    @State private var viewModel: AccountViewModel

    var body: some View {
        Group {
            switch viewModel.state {
            case .idle, .loading:
                ProgressView()
            case .success(let account):
                AccountCard(account: account)
            case .failure(let error, let retry):
                ErrorBanner(error: error, onRetry: retry)
            }
        }
    }
}`,
  },
  {
    id: "viewmodel",
    name: "ViewModel",
    visualOrder: 3,
    flowRole: "State Machine & Coordination",
    layer: "STATE MACHINE",
    swiftType: "@Observable @MainActor final class",
    responsibilities: [
      "Translates user intents into domain service calls",
      "Maintains deterministic ViewState (idle, loading, success, failure)",
      "Guarantees @MainActor thread isolation for UI state changes",
    ],
    refusesToOwn: [
      "No UIKit/SwiftUI imports or UI frame calculations",
      "No raw SQL queries or transport socket handling",
    ],
    dataFlowIn: "User intents from View; Result<DomainModel, Error> from Service",
    dataFlowOut: "Published ViewState values observed by View",
    architecturalDecisions:
      "Adopting @Observable with @MainActor eliminates data races and removes legacy Combine boilerplate, producing synchronous single-thread UI state mutations.",
    validationBoundaries:
      "Exhaustive state enum validation: Prevents impossible states like showing a spinner and an error banner simultaneously.",
    codeSnippet: `// 3. MainActor Isolated ViewModel
@Observable
@MainActor
public final class AccountViewModel {
    public private(set) var state: ViewState<Account, DomainError> = .idle
    private let service: AccountServicing

    public init(service: AccountServicing) {
        self.service = service
    }

    public func handleIntent(_ intent: AccountIntent) async {
        state = .loading(previous: state.currentData)
        do {
            let account = try await service.fetchAccount()
            state = .success(account)
        } catch {
            state = .failure(error.asDomainError, retryAction: { [weak self] in
                Task { await self?.handleIntent(intent) }
            })
        }
    }
}`,
  },
  {
    id: "service",
    name: "Service Layer",
    visualOrder: 4,
    flowRole: "Domain Contracts & Business Rules",
    layer: "BUSINESS LOGIC (DI)",
    swiftType: "protocol AccountServicing: Sendable",
    responsibilities: [
      "Applies enterprise business rules and calculations",
      "Coordinates multiple repositories or cache policies",
      "Transforms raw DTOs into sanitized domain entities",
    ],
    refusesToOwn: [
      "No knowledge of UI components or presentation state",
      "No low-level HTTP header configuration",
    ],
    dataFlowIn: "Domain query parameters from ViewModel",
    dataFlowOut: "Domain entities or typed DomainErrors to ViewModel",
    architecturalDecisions:
      "Service contracts are defined as Swift protocols conforming to Sendable. This enables seamless mock substitution in unit tests without compiling network or UI code.",
    validationBoundaries:
      "Domain invariants (e.g. account numbers conform to IBAN format, transaction amounts are non-negative).",
    codeSnippet: `// 4. Sendable Protocol Contract
public protocol AccountServicing: Sendable {
    func fetchAccount() async throws -> Account
}

public struct AccountService: AccountServicing {
    private let client: HTTPClientProtocol

    public func fetchAccount() async throws -> Account {
        let dto: AccountDTO = try await client.execute(Endpoint.accountSummary)
        return dto.toDomain() // Sanitizes & maps raw DTO to Domain Entity
    }
}`,
  },
  {
    id: "api",
    name: "API & Infrastructure",
    visualOrder: 5,
    flowRole: "Network Transport & Persistence",
    layer: "INFRASTRUCTURE",
    swiftType: "actor NetworkClient: HTTPClientProtocol",
    responsibilities: [
      "Executes URLSession asynchronous transport requests",
      "Serializes OAuth token refreshes to avoid 401 race conditions",
      "Performs Codable schema decoding and HTTP status validation",
    ],
    refusesToOwn: [
      "No domain business rules or policy calculations",
      "No UI state tracking",
    ],
    dataFlowIn: "Endpoint configuration & HTTP parameters",
    dataFlowOut: "Decoded Codable DTOs or NetworkError to Service",
    architecturalDecisions:
      "Using Swift actor isolation for network transport serializes concurrent token refreshes, preventing token race conditions when several views load simultaneously.",
    validationBoundaries:
      "HTTP status codes (200-299), cryptographic TLS certificates, and Codable JSON schema conformance.",
    codeSnippet: `// 5. Actor-Isolated Network Transport
public actor NetworkClient: HTTPClientProtocol {
    private let session: URLSession
    private let tokenStore: TokenManaging

    public func execute<T: Decodable>(_ endpoint: Endpoint) async throws -> T {
        let token = try await tokenStore.validToken()
        var request = endpoint.urlRequest
        request.setValue("Bearer \\(token)", forHTTPHeaderField: "Authorization")

        let (data, response) = try await session.data(for: request)
        guard let http = response as? HTTPURLResponse, (200...299).contains(http.statusCode) else {
            throw NetworkError.serverError
        }
        return try JSONDecoder().decode(T.self, from: data)
    }
}`,
  },
  {
    id: "state-update",
    name: "State Update",
    visualOrder: 6,
    flowRole: "Unidirectional UI Reflection",
    layer: "RESULT & RENDERING",
    swiftType: "ViewState.success(Account) -> UI Diff",
    responsibilities: [
      "Delivers validated domain model to @Observable ViewModel",
      "Triggers granular SwiftUI body diff or UIKit view reload",
      "Clears pending progress animations smoothly",
    ],
    refusesToOwn: [
      "Zero asynchronous scheduling (already delivered on @MainActor)",
    ],
    dataFlowIn: "Validated domain result from Service",
    dataFlowOut: "Rendered screen frame at 60/120fps on device display",
    architecturalDecisions:
      "Unidirectional data flow ensures state flows DOWN while events flow UP. UI can never become out of sync with domain model, guaranteeing deterministic screen behaviour.",
    validationBoundaries:
      "Visual accessibility contrast, safe-area layout guides, animations completed.",
    codeSnippet: `// 6. Granular SwiftUI Body Diff
// When viewModel.state changes from .loading to .success(account),
// SwiftUI computes minimal render diff:
AccountCard(account: account)
    .transition(.opacity.combined(with: .scale(scale: 0.98)))
    .animation(.snappy(duration: 0.25), value: account.balance)`,
  },
];

export function ArchitectureFlow() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("viewmodel");
  const [simulatingStep, setSimulatingStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isTraceFinished, setIsTraceFinished] = useState<boolean>(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const selectedNode =
    ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) ?? ARCHITECTURE_NODES[2];

  function runFlowSimulation() {
    setCompletedSteps([]);
    setIsTraceFinished(false);
    setSimulatingStep(0);
    setSelectedNodeId(ARCHITECTURE_NODES[0].id);

    ARCHITECTURE_NODES.forEach((node, idx) => {
      setTimeout(() => {
        setSimulatingStep(idx);
        setSelectedNodeId(ARCHITECTURE_NODES[idx].id);
        setCompletedSteps(Array.from({ length: idx }, (_, i) => i));

        if (idx === ARCHITECTURE_NODES.length - 1) {
          setTimeout(() => {
            setSimulatingStep(null);
            setCompletedSteps(Array.from({ length: ARCHITECTURE_NODES.length }, (_, i) => i));
            setIsTraceFinished(true);
          }, 1100);
        }
      }, (idx + 1) * 850);
    });
  }

  function resetSimulation() {
    setSimulatingStep(null);
    setCompletedSteps([]);
    setIsTraceFinished(false);
    setSelectedNodeId("viewmodel");
  }

  return (
    <div
      id="architecture"
      ref={ref}
      className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    >
      <div className="rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 lg:p-10 shadow-xl">
        {/* Header Bar */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full px-2.5 py-0.5 font-mono-code text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                ILLUSTRATIVE ARCHITECTURE PATTERN
              </span>
              <span className="text-foreground-subtle/40">•</span>
              <span className="font-mono-code text-xs text-foreground-subtle">
                MVVM-C Unidirectional Mobile Data Flow
              </span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Architecture Deep-Dive &amp; Data Flow
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-foreground-muted max-w-2xl">
              Inspect how responsibilities, data flow, architectural choices, and validation boundaries are decoupled across layers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isTraceFinished && (
              <button
                type="button"
                onClick={resetSimulation}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 font-mono-code text-xs font-semibold text-foreground-muted hover:text-foreground hover:bg-surface-raised transition-all cursor-pointer"
                title="Reset simulation state"
              >
                <RotateCcw className="size-3" />
                <span>Reset</span>
              </button>
            )}

            <button
              type="button"
              onClick={runFlowSimulation}
              disabled={simulatingStep !== null}
              className="liquid-glass-emerald inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono-code text-xs font-semibold text-[var(--emerald-action-text)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isTraceFinished ? (
                <>
                  <RotateCcw className="size-3" />
                  <span>Replay Flow Trace</span>
                </>
              ) : (
                <>
                  <Play className="size-3" />
                  <span>
                    {simulatingStep !== null
                      ? `Tracing: ${ARCHITECTURE_NODES[simulatingStep].name} (${simulatingStep + 1}/6)...`
                      : "Simulate Data Flow"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visual Flow Breadcrumb Sequence: User Action -> View -> ViewModel -> Service -> API -> State Update */}
        <div className="mt-5 overflow-x-auto pb-1">
          <div className="flex min-w-[700px] items-center gap-1.5 rounded-2xl border border-border/80 bg-surface/80 p-2.5 font-mono-code text-xs">
            <span className="mr-1 text-[11px] font-bold uppercase tracking-wider text-foreground-subtle shrink-0">
              Visual Flow:
            </span>
            {ARCHITECTURE_NODES.map((node, i) => {
              const isActive = simulatingStep === i;
              const isDone = completedSteps.includes(i);
              const isSelected = selectedNode.id === node.id;

              return (
                <div key={node.id} className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`rounded-lg px-2 py-0.5 transition-all cursor-pointer ${isActive
                        ? "border border-emerald-500/50 bg-emerald-500/20 font-bold text-emerald-300 ring-2 ring-emerald-500/30 animate-pulse"
                        : isSelected
                          ? "border border-accent bg-accent/20 font-bold text-accent"
                          : isDone
                            ? "border border-accent/30 bg-accent/15 font-semibold text-accent"
                            : "border border-border/40 text-foreground-subtle hover:text-foreground"
                      }`}
                  >
                    {node.name}
                  </button>
                  {i < ARCHITECTURE_NODES.length - 1 && (
                    <ArrowRight
                      className={`size-3 transition-colors ${isDone ? "text-accent" : "text-foreground-subtle/30"
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanatory Boundary Callout */}
        <div className="mt-4 rounded-xl border border-border/60 bg-surface/40 px-3.5 py-2 text-xs text-foreground-subtle flex items-center justify-between">
          <span>
            <strong className="text-foreground">Pattern Distinction: </strong>
            This interactive diagram represents an <em className="text-accent font-normal">illustrative MVVM-C pattern</em>. Specific verified implementations for BNL, Insomnia Cookies, and Mighty Audio are detailed in the Case Studies section.
          </span>
        </div>

        {/* Main Workspace: Left Nodes Grid + Right Detailed Inspector */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: 6 Interactive Architecture Nodes */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-foreground-subtle pb-1">
              <span className="font-mono-code uppercase tracking-wider">
                System Components (Select to inspect)
              </span>
              <span className="font-mono-code text-xs text-accent">
                {simulatingStep !== null ? "Trace Active..." : "Click any layer"}
              </span>
            </div>

            {ARCHITECTURE_NODES.map((node, idx) => {
              const isSelected = selectedNode.id === node.id;
              const isSimulating = simulatingStep === idx;
              const isCompleted = completedSteps.includes(idx);

              return (
                <div key={node.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full text-left rounded-2xl border p-4 transition-all cursor-pointer ${isSimulating
                        ? "border-emerald-400 bg-emerald-500/20 shadow-lg ring-2 ring-emerald-400/60 scale-[1.01]"
                        : isSelected
                          ? "border-accent/60 bg-accent/10 shadow-md ring-1 ring-accent/30"
                          : isCompleted
                            ? "border-accent/40 bg-accent/5 hover:border-accent/60"
                            : "border-border bg-surface hover:border-border-strong hover:bg-surface-raised"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex size-6 items-center justify-center rounded-lg font-mono-code text-xs font-bold border transition-colors ${isSimulating
                              ? "bg-emerald-400 text-black border-emerald-300 shadow-sm animate-pulse"
                              : isCompleted
                                ? "bg-accent/20 text-accent border-accent/40"
                                : "bg-surface-raised text-accent border-border"
                            }`}
                        >
                          {node.visualOrder}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground text-sm sm:text-base">
                              {node.name}
                            </span>
                            {isSimulating && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/25 px-2 py-0.5 font-mono-code text-[11px] font-bold text-emerald-300 border border-emerald-500/40">
                                <Radio className="size-2.5 animate-spin" />
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <div className="font-mono-code text-xs text-foreground-subtle">
                            {node.flowRole}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full px-2 py-0.5 font-mono-code text-[11px] text-foreground-subtle bg-surface-raised border border-border">
                          {node.layer}
                        </span>
                        <ArrowRight
                          className={`size-3.5 transition-transform ${isSelected ? "text-accent translate-x-1" : "text-foreground-subtle/50"
                            }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Visual connector line between steps */}
                  {idx < ARCHITECTURE_NODES.length - 1 && (
                    <div className="flex justify-center my-0.5" aria-hidden="true">
                      <div
                        className={`h-2 w-[2px] transition-colors duration-500 ${completedSteps.includes(idx) ? "bg-accent shadow-xs" : "bg-border-strong"
                          }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Node Deep-Dive Inspector */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-border-strong bg-surface-raised p-5 sm:p-6 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono-code text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="size-3.5" />
                  Layer Inspector: {selectedNode.name}
                </span>
                <span className="rounded-full px-2.5 py-0.5 font-mono-code text-xs bg-accent/15 text-accent border border-accent/25">
                  {selectedNode.layer}
                </span>
              </div>

              {/* Responsibilities vs Non-Responsibilities */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-emerald-900/30 bg-surface p-3">
                  <span className="font-mono-code text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">
                    Core Responsibilities:
                  </span>
                  <ul className="space-y-1.5 text-foreground-muted leading-relaxed">
                    {selectedNode.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-1.5">
                        <CheckCircle2 className="size-3 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-red-900/30 bg-surface p-3">
                  <span className="font-mono-code text-[11px] font-bold text-red-400 uppercase tracking-wider block mb-1.5">
                    Refuses To Own (Decoupling):
                  </span>
                  <ul className="space-y-1.5 text-foreground-muted leading-relaxed">
                    {selectedNode.refusesToOwn.map((r) => (
                      <li key={r} className="flex items-start gap-1.5">
                        <ShieldAlert className="size-3 text-red-400 mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Data Flow & Boundaries */}
              <div className="mt-4 space-y-2.5 border-t border-border pt-3.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-lg border border-border/60 bg-surface px-3 py-2">
                  <span className="font-mono-code text-[11px] text-foreground-subtle font-semibold uppercase">
                    Inbound Input:
                  </span>
                  <span className="font-mono-code text-foreground text-right sm:max-w-xs">
                    {selectedNode.dataFlowIn}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-lg border border-border/60 bg-surface px-3 py-2">
                  <span className="font-mono-code text-[11px] text-accent font-semibold uppercase">
                    Outbound Emission:
                  </span>
                  <span className="font-mono-code text-accent text-right sm:max-w-xs">
                    {selectedNode.dataFlowOut}
                  </span>
                </div>

                {/* Architectural Decision Rationale */}
                <div className="rounded-xl border border-border bg-surface/70 p-3">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-accent font-semibold block mb-1">
                    Architectural Decision Rationale:
                  </span>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-foreground-muted">
                    {selectedNode.architecturalDecisions}
                  </p>
                </div>

                {/* Validation Boundary */}
                <div className="rounded-xl border border-border bg-surface/70 p-3">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-foreground font-semibold block mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="size-3 text-accent" />
                    Validation Boundary:
                  </span>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-foreground-muted">
                    {selectedNode.validationBoundaries}
                  </p>
                </div>
              </div>

              {/* Swift Code Contract */}
              <div className="mt-4 rounded-xl border border-neutral-800 bg-[#040705] p-3.5 font-mono-code text-xs">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="size-3.5 text-accent" />
                    Swift Implementation Contract
                  </span>
                  <span className="text-neutral-500">{selectedNode.swiftType}</span>
                </div>
                <div className="mt-2.5 overflow-x-auto max-h-[180px] text-neutral-200 text-[11px] leading-relaxed">
                  <pre className="whitespace-pre">
                    <code>{selectedNode.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
