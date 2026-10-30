"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  FileCheck2,
  FileCode,
  Layers,
  Pause,
  Play,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useInView } from "./use-in-view";

interface WorkflowStage {
  step: string;
  id: string;
  name: string;
  owner: string;
  ownerRole: string;
  badgeColor: string;
  summary: string;
  deliverable: string;
  icon: typeof Bot;
  codeSnippet: string;
  codeLanguage: string;
  codeCaption: string;
  observations: readonly {
    title: string;
    description: string;
    type: "risk" | "review" | "validation" | "check";
  }[];
}

const WORKFLOW_STAGES: readonly WorkflowStage[] = [
  {
    step: "01",
    id: "task-definition",
    name: "Task Definition",
    owner: "Senior Engineer & Requirements Spec",
    ownerRole: "Problem Framing & Architecture Boundaries",
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    summary:
      "Explicitly specifies domain contracts, thread safety rules, cancellation requirements, and deterministic state transitions prior to drafting any code.",
    deliverable: "Protocol contract, ViewState specifications, and boundary test cases",
    icon: Layers,
    codeCaption: "Technical Contract Specification (Domain Boundary)",
    codeLanguage: "swift",
    codeSnippet: `// Step 1: Formal Domain Contract Specification
import Foundation

public struct Transaction: Identifiable, Sendable, Equatable {
    public let id: String
    public let amount: Decimal
    public let currency: String
    public let timestamp: Date
    public let recipient: String
}

public protocol TransactionServicing: Sendable {
    /// Fetches transactions for an account with cooperative cancellation support.
    func fetchTransactions(accountNumber: String) async throws -> [Transaction]
}

public enum ViewState<Value: Sendable, Failure: Error>: Sendable {
    case idle
    case loading(previous: Value?)
    case success(Value)
    case failure(Failure, retryAction: (@Sendable () -> Void)?)
}`,
    observations: [
      {
        title: "Deterministic State Model",
        description: "Enforces generic ViewState enum to eliminate invalid states (e.g. concurrent spinner + error alert).",
        type: "validation",
      },
      {
        title: "Strict Swift Concurrency",
        description: "Requires Sendable conformance and explicit cooperative cancellation propagation across async boundaries.",
        type: "validation",
      },
    ],
  },
  {
    step: "02",
    id: "ai-draft",
    name: "AI-Assisted Draft",
    owner: "AI Coding Assistant",
    ownerRole: "Syntactic Scaffolding & Initial Draft",
    badgeColor: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    summary:
      "AI rapidly drafts boilerplate SwiftUI views and mock networking, but introduces common subtle concurrency and lifecycle anti-patterns.",
    deliverable: "Initial syntactically valid SwiftUI implementation with highlighted risks",
    icon: Bot,
    codeCaption: "Initial AI-Generated Draft (Contains Architectural Risks)",
    codeLanguage: "swift",
    codeSnippet: `// Step 2: Unfiltered AI-Assisted Draft (Vulnerable)
import SwiftUI

struct TransactionsListView: View {
    @State private var items: [Transaction] = []
    @State private var isFetching: Bool = false     // ⚠️ Risk: Ad-hoc boolean flag
    @State private var errorMessage: String? = nil

    var body: some View {
        List(items) { item in
            TransactionRow(item: item)
        }
        .onAppear {
            // ⚠️ Risk 1: Unmanaged Task {} is NOT cancelled when view is dismissed
            // ⚠️ Risk 2: Captured self closure can cause retention if escaping
            Task {
                self.isFetching = true
                do {
                    let url = URL(string: "https://api.bank.internal/v1/tx")!
                    let (data, _) = try await URLSession.shared.data(from: url)
                    let decoded = try JSONDecoder().decode([Transaction].self, from: data)
                    // ⚠️ Risk 3: Mutating state without guaranteed @MainActor isolation
                    self.items = decoded
                } catch {
                    self.errorMessage = error.localizedDescription
                }
                self.isFetching = false
            }
        }
    }
}`,
    observations: [
      {
        title: "Un-scoped Background Task",
        description: "Launching an unmanaged Task {} inside onAppear does not cancel when the user leaves the screen, wasting network bandwidth.",
        type: "risk",
      },
      {
        title: "Direct Network Coupling",
        description: "View directly invokes URLSession without protocol abstraction, making unit testing impossible without live network mocks.",
        type: "risk",
      },
      {
        title: "Non-Deterministic State",
        description: "Independent boolean flags (isFetching, errorMessage) permit inconsistent UI states.",
        type: "risk",
      },
    ],
  },
  {
    step: "03",
    id: "engineer-review",
    name: "Engineer Review",
    owner: "Senior iOS Engineer",
    ownerRole: "Human Scrutiny & Vulnerability Identification",
    badgeColor: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    summary:
      "A seasoned engineer conducts architectural and concurrency triage, identifying retain cycle risks, thread boundaries, and maintainability flaws.",
    deliverable: "Line-by-line review notes and refactoring directive",
    icon: UserCheck,
    codeCaption: "Senior Engineering Review Annotations",
    codeLanguage: "markdown",
    codeSnippet: `### SENIOR ARCHITECTURAL REVIEW NOTES
FILE: TransactionsListView.swift
REVIEWER: Dineshbabu Elumalai (Lead iOS Reviewer)

[CRITICAL - LINE 14]: onAppear { Task { ... } }
- Issue: Unmanaged task lifecycle. If user taps back while fetching,
  the network task continues in the background.
- Refactor Directive: Adopt SwiftUI's .task(id:) modifier for automatic
  cooperative cancellation tied to view presentation.

[MAJOR - LINE 8-10]: Independent @State flags
- Issue: Boolean flags allow simultaneous (isFetching == true && errorMessage != nil).
- Refactor Directive: Replace with exhaustive ViewState enum in dedicated ViewModel.

[ARCHITECTURAL - LINE 18]: Direct URLSession call in View body
- Issue: Violates MVVM-C separation. Views must only observe presentation state.
- Refactor Directive: Extract logic to @Observable @MainActor TransactionsViewModel
  with injected TransactionServicing protocol for dependency injection.`,
    observations: [
      {
        title: "Review Decision: REJECT DRAFT",
        description: "Direct URLSession in SwiftUI View violates layered architecture; requires MVVM-C extraction.",
        type: "review",
      },
      {
        title: "Concurrency Boundary Audit",
        description: "Identified missing Task cancellation handling that could cause stale state writes upon rapid screen pop.",
        type: "review",
      },
    ],
  },
  {
    step: "04",
    id: "architecture-validation",
    name: "Architecture Validation",
    owner: "System Boundary Control",
    ownerRole: "Protocol Conformance & Concurrency Isolation",
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    summary:
      "Refactors the draft into a decoupled, protocol-backed MVVM-C architecture with @Observable, @MainActor safety, and cooperative cancellation.",
    deliverable: "Production-ready, testable ViewModel and declarative SwiftUI presentation",
    icon: Cpu,
    codeCaption: "Refactored Architecture (MVVM-C + Structured Concurrency)",
    codeLanguage: "swift",
    codeSnippet: `// Step 4: Refactored Production Architecture
import SwiftUI

@Observable
@MainActor
public final class TransactionsViewModel {
    public private(set) var state: ViewState<[Transaction], Error> = .idle
    private let service: TransactionServicing
    private let accountNumber: String

    public init(service: TransactionServicing, accountNumber: String) {
        self.service = service
        self.accountNumber = accountNumber
    }

    public func loadTransactions() async {
        let previous = state.currentData
        state = .loading(previous: previous)

        do {
            let fresh = try await service.fetchTransactions(accountNumber: accountNumber)
            // Task.checkCancellation() respected internally
            state = .success(fresh)
        } catch is CancellationError {
            // Graceful cancellation: Retain previous state without false error banners
            state = previous.map(ViewState.success) ?? .idle
        } catch {
            state = .failure(error, retryAction: { [weak self] in
                Task { await self?.loadTransactions() }
            })
        }
    }
}

public struct TransactionsListView: View {
    @State private var viewModel: TransactionsViewModel

    public var body: some View {
        Group {
            switch viewModel.state {
            case .idle, .loading(previous: nil):
                ProgressView("Loading transactions...")
            case .success(let items), .loading(previous: .some(let items)):
                TransactionsContent(items: items)
            case .failure(let error, let retry):
                ErrorStateView(error: error, retryAction: retry)
            }
        }
        // Cooperative task lifecycle: Automatically cancelled on view teardown
        .task {
            await viewModel.loadTransactions()
        }
    }
}`,
    observations: [
      {
        title: "Cooperative Cancellation",
        description: "View .task modifier guarantees automatic Task cancellation when user pops view.",
        type: "validation",
      },
      {
        title: "@MainActor Isolation",
        description: "Guarantees UI mutations always occur on the main execution context without manual DispatchQueue hops.",
        type: "validation",
      },
    ],
  },
  {
    step: "05",
    id: "automated-tests",
    name: "Automated Tests",
    owner: "Automated Test Harness",
    ownerRole: "Deterministic Mocking & Regression Safety",
    badgeColor: "border-sky-500/30 text-sky-400 bg-sky-500/10",
    summary:
      "Constructs targeted async unit tests to verify state transitions, network timeout simulations, cancellation resilience, and retry closures.",
    deliverable: "Isolated XCTest assertions without live network dependencies",
    icon: FileCheck2,
    codeCaption: "Async Concurrency Test Suite (XCTest)",
    codeLanguage: "swift",
    codeSnippet: `// Step 5: Isolated Concurrency & State Assertions
import XCTest
@testable import BankingFeature

final class TransactionsViewModelTests: XCTestCase {

    @MainActor
    func test_loadTransactions_success_transitionsToSuccessState() async {
        // Arrange
        let expected = [Transaction.fixture(id: "tx-1", amount: 150.0)]
        let mockService = MockTransactionService(result: .success(expected))
        let sut = TransactionsViewModel(service: mockService, accountNumber: "ACC-001")

        // Act
        await sut.loadTransactions()

        // Assert
        guard case .success(let items) = sut.state else {
            return XCTFail("Expected .success state, got: \\(sut.state)")
        }
        XCTAssertEqual(items, expected)
    }

    @MainActor
    func test_loadTransactions_cancelled_preservesPreviousStateWithoutError() async {
        // Arrange
        let mockService = MockTransactionService(delayNanoseconds: 2_000_000_000)
        let sut = TransactionsViewModel(service: mockService, accountNumber: "ACC-001")

        // Act: Start loading then immediately cancel
        let task = Task { await sut.loadTransactions() }
        task.cancel()
        await task.value

        // Assert: Ensure no error banner is displayed for expected cancellation
        if case .failure = sut.state {
            XCTFail("Cancellation must not trigger .failure banner")
        }
    }
}`,
    observations: [
      {
        title: "Cancellation Resilience Verified",
        description: "Explicit test confirms that intentional view dismissal does not show false positive network error dialogs.",
        type: "check",
      },
      {
        title: "Mock Isolation",
        description: "Tests run sub-millisecond in CI without relying on external sandbox endpoints or Wi-Fi connectivity.",
        type: "check",
      },
    ],
  },
  {
    step: "06",
    id: "manual-verification",
    name: "Manual Verification",
    owner: "Instruments & QA Inspection",
    ownerRole: "Runtime Profiling & Accessibility Audit",
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    summary:
      "Performs Xcode Instruments memory profiling under repetitive push/pop cycles, verifies VoiceOver element focus, and tests Dynamic Type layout budgets.",
    deliverable: "Instruments trace audit, accessibility check, and release sign-off",
    icon: ShieldCheck,
    codeCaption: "Release Quality & Runtime Verification Checklist",
    codeLanguage: "markdown",
    codeSnippet: `### RUNTIME & RELEASE VERIFICATION CHECKLIST
DEVICE TARGET: iPhone 15 Pro (iOS 17.4) + iPhone SE 3rd Gen (Compact Viewport)

[PASS] MEMORY & ARC AUDIT (Xcode Instruments - Leaks):
  - 50 consecutive push/pop navigation transitions tested.
  - Zero persistent allocations or retain cycles detected in ViewModel.
  - Task cancellation verified via signpost telemetry.

[PASS] ACCESSIBILITY (VoiceOver & Dynamic Type):
  - Largest Accessibility Font Size (AX5): No clipped labels, vertical wrapping verified.
  - Screen reader traversal: All transaction rows combined into single accessible element.
  - Contrast ratio exceeds WCAG 2.1 AA (7.4:1 on dark surface).

[PASS] RESILIENCE:
  - Airplane mode simulation: Retry action correctly re-triggers loadTransactions().
  - Background app switch during network call: Resumes smoothly without duplicate requests.`,
    observations: [
      {
        title: "Instruments Leak Profiling",
        description: "Confirmed zero memory leaks under rapid coordinator push and dismiss cycles.",
        type: "check",
      },
      {
        title: "Accessibility Standards",
        description: "VoiceOver labels and Dynamic Type font expansion verified on real hardware devices.",
        type: "check",
      },
    ],
  },
];

export function AIEngineeringFlow() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(2); // Default to Engineer Review stage
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const activeStage = WORKFLOW_STAGES[activeStageIndex];

  // Auto-play walkthrough effect
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % WORKFLOW_STAGES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 lg:p-10 shadow-xl">
        {/* Lab Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full px-2.5 py-0.5 font-mono-code text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/25">
                INTERACTIVE ENGINEERING LAB
              </span>
              <span className="text-foreground-subtle/40">•</span>
              <span className="font-mono-code text-xs text-foreground-subtle">
                Deterministic Educational Demonstration
              </span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Human-in-the-Loop AI Engineering Workflow
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-foreground-muted">
              Inspect how senior engineering scrutiny, architecture validation, and automated tests govern AI-assisted code.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 font-mono-code text-xs font-medium text-foreground hover:border-accent hover:text-accent transition-all cursor-pointer"
              aria-label={isPlaying ? "Pause automated workflow walkthrough" : "Play automated workflow walkthrough"}
            >
              {isPlaying ? (
                <>
                  <Pause className="size-3 text-amber-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="size-3 text-accent" />
                  <span>Auto-Step</span>
                </>
              )}
            </button>

            <LiquidGlass
              variant="control"
              className="hidden sm:inline-flex rounded-xl px-3 py-1.5 font-mono-code text-xs text-foreground-subtle"
            >
              Local Simulation • Zero AI API Calls
            </LiquidGlass>
          </div>
        </div>

        {/* 6-Stage Interactive Stepper Pipeline */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs sm:text-[13px] text-foreground-subtle mb-3">
            <span className="font-mono-code uppercase tracking-wider font-semibold text-foreground">
              The 6-Stage Engineering Gate
            </span>
            <span className="font-mono-code text-xs text-accent">
              Click any stage to inspect review observations &amp; code
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStageIndex === idx;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStageIndex(idx);
                  }}
                  className={`flex flex-col justify-between rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent/60 bg-accent/10 shadow-md ring-1 ring-accent/40"
                      : "border-border bg-surface hover:border-border-strong hover:bg-surface-raised"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-[11px] font-bold text-accent">
                        STAGE {stage.step}
                      </span>
                      <Icon className="size-3.5 text-accent" />
                    </div>
                    <div className="mt-1.5 text-xs sm:text-[13px] font-bold text-foreground truncate">
                      {stage.name}
                    </div>
                  </div>

                  <div className="mt-2.5 border-t border-border/60 pt-1.5 font-mono-code text-[10px] text-foreground-subtle truncate">
                    {stage.owner.split("&")[0].trim()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Navigation Arrows */}
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            disabled={activeStageIndex === 0}
            onClick={() => {
              setIsPlaying(false);
              setActiveStageIndex((prev) => Math.max(0, prev - 1));
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 font-mono-code text-xs text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="size-3" />
            <span>Previous</span>
          </button>

          <span className="font-mono-code text-xs text-foreground-subtle">
            Stage {activeStage.step} of 06 — {activeStage.name}
          </span>

          <button
            type="button"
            disabled={activeStageIndex === WORKFLOW_STAGES.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setActiveStageIndex((prev) => Math.min(WORKFLOW_STAGES.length - 1, prev + 1));
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 font-mono-code text-xs text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <span>Next Stage</span>
            <ArrowRight className="size-3" />
          </button>
        </div>

        {/* Stage Detail Inspector (Deep Dive Workspace) */}
        <div className="mt-6 rounded-2xl border border-border-strong bg-[#070b09] p-5 sm:p-6 shadow-inner">
          {/* Stage Metadata Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-lg bg-emerald-500/10 font-mono-code text-xs font-bold text-accent border border-emerald-500/20">
                  {activeStage.step}
                </span>
                <h4 className="font-mono-code text-sm sm:text-base font-semibold text-neutral-100">
                  {activeStage.name}
                </h4>
                <span className={`rounded-full px-2 py-0.5 font-mono-code text-[11px] font-semibold border ${activeStage.badgeColor}`}>
                  {activeStage.ownerRole}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                {activeStage.summary}
              </p>
            </div>

            <div className="text-right">
              <span className="font-mono-code text-[11px] uppercase tracking-wider text-neutral-500 block">
                Deliverable
              </span>
              <span className="font-mono-code text-xs text-accent">
                {activeStage.deliverable}
              </span>
            </div>
          </div>

          {/* Code & Observation Workspace */}
          <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Left: Code Viewer */}
            <div className="flex flex-col justify-between rounded-xl border border-neutral-800 bg-[#040705] p-4 font-mono-code">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5 text-[11px]">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <FileCode className="size-3.5 text-accent" />
                    {activeStage.codeCaption}
                  </span>
                  <span className="text-neutral-500 uppercase text-[10px]">
                    {activeStage.codeLanguage}
                  </span>
                </div>

                <div className="mt-3 overflow-x-auto max-h-[360px] text-xs leading-relaxed text-neutral-200">
                  <pre className="whitespace-pre">
                    <code>{activeStage.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Deterministic educational example</span>
                <span className="text-neutral-400">Swift 5.9+ / Concurrency</span>
              </div>
            </div>

            {/* Right: Architectural Observations & Checks */}
            <div className="space-y-3 flex flex-col justify-between">
              <div>
                <h5 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
                  <ClipboardCheck className="size-3.5 text-accent" />
                  Engineering Observations &amp; Verification
                </h5>

                <div className="space-y-2.5">
                  {activeStage.observations.map((obs) => {
                    const isRisk = obs.type === "risk";
                    const isReview = obs.type === "review";

                    return (
                      <div
                        key={obs.title}
                        className={`rounded-xl border p-3 text-xs leading-relaxed ${
                          isRisk
                            ? "border-red-900/40 bg-red-950/20 text-neutral-300"
                            : isReview
                            ? "border-amber-900/40 bg-amber-950/20 text-neutral-300"
                            : "border-emerald-900/40 bg-emerald-950/20 text-neutral-300"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-mono-code font-bold text-xs mb-1">
                          {isRisk ? (
                            <AlertTriangle className="size-3.5 text-red-400 shrink-0" />
                          ) : isReview ? (
                            <UserCheck className="size-3.5 text-amber-400 shrink-0" />
                          ) : (
                            <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                          )}
                          <span
                            className={
                              isRisk
                                ? "text-red-300"
                                : isReview
                                ? "text-amber-300"
                                : "text-emerald-300"
                            }
                          >
                            {obs.title}
                          </span>
                        </div>
                        <p className="text-neutral-300">{obs.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Educational Simulation Notice */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3 text-[11px] text-neutral-400">
                <span className="font-semibold text-neutral-300">Illustrative Note: </span>
                This sample demonstrates how a senior engineer rejects naive AI code and refactors it into a thread-safe, decoupled MVVM-C implementation.
              </div>
            </div>
          </div>
        </div>

        {/* Defensible Engineering Comparison (Replaces unsupported metrics) */}
        <div className="mt-8 border-t border-border/70 pt-6">
          <div className="mb-4">
            <span className="font-mono-code text-xs uppercase tracking-wider font-semibold text-accent">
              Engineering Governance
            </span>
            <h4 className="mt-1 text-base sm:text-lg font-bold text-foreground">
              Unsupervised AI Risks vs. Senior-Governed Acceleration
            </h4>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
            {/* Left Card: Risks of Unchecked AI */}
            <div className="rounded-2xl border border-red-900/30 bg-surface-raised p-4 sm:p-5">
              <div className="flex items-center gap-2 font-mono-code text-xs sm:text-sm text-red-400 font-bold">
                <AlertTriangle className="size-4 shrink-0" />
                <span>Unsupervised AI Vulnerabilities in iOS:</span>
              </div>
              <ul className="mt-3 space-y-2 leading-relaxed text-foreground-muted">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0">•</span>
                  <span>Unmanaged Task lifetimes creating memory retention and orphaned network calls on view pop.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0">•</span>
                  <span>Missing @MainActor boundaries leading to hazardous background thread UI state updates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0">•</span>
                  <span>Ad-hoc boolean flags that allow invalid simultaneous loading/error UI states.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 shrink-0">•</span>
                  <span>Direct coupling of views to concrete networking, preventing isolated unit testing.</span>
                </li>
              </ul>
            </div>

            {/* Right Card: Senior-Governed Practices */}
            <div className="rounded-2xl border border-accent/40 bg-surface-raised p-4 sm:p-5">
              <div className="flex items-center gap-2 font-mono-code text-xs sm:text-sm text-accent font-bold">
                <ShieldCheck className="size-4 shrink-0" />
                <span>Senior-Governed Engineering Practices:</span>
              </div>
              <ul className="mt-3 space-y-2 leading-relaxed text-foreground-muted">
                <li className="flex items-start gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>Accelerates boilerplate drafting, schema typing, and initial model generation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>Senior engineer enforces protocol-abstracted MVVM-C contracts and strict concurrency isolation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>Automated test harnesses assert cancellation behavior, error recovery, and mock edge cases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent shrink-0">•</span>
                  <span>Instruments profiling systematically checks for retain cycles under real device navigation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
