"use client";

import { useState } from "react";
import {
  Boxes,
  CheckCircle2,
  FileCode2,
  Layers,
  Network,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useInView } from "./use-in-view";

interface LifecycleStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  icon: typeof FileCode2;
  visualSnippet: {
    filename: string;
    badge: string;
    code: string[];
    highlight: string;
  };
  metrics: { label: string; value: string }[];
  description: string;
}

const LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    id: "requirement",
    number: "01",
    title: "Requirement Framing",
    subtitle: "Product RFC, failure modes & constraint mapping",
    category: "SPECIFICATION",
    icon: FileCode2,
    visualSnippet: {
      filename: "SPEC-042-PolicyServicing.md",
      badge: "RFC APPROVED",
      code: [
        "## Constraints & Edge Cases",
        "- Offline fallback with local SQLite persistence",
        "- Biometric auth gate before policy cancellation",
        "- Dynamic Type compliance across all accessibility tiers",
      ],
      highlight: "Enforce deterministic state before writing UI code.",
    },
    metrics: [
      { label: "Design System", value: "Tokens Aligned" },
      { label: "API Contract", value: "Schema Frozen" },
    ],
    description:
      "Clarify ambiguous product requirements into strict engineering constraints, offline state requirements, and testable boundary conditions before implementation begins.",
  },
  {
    id: "architecture",
    number: "02",
    title: "Architecture & Boundaries",
    subtitle: "MVVM-C decoupling & dependency injection",
    category: "SYSTEM DESIGN",
    icon: Boxes,
    visualSnippet: {
      filename: "PolicyContracts.swift",
      badge: "DECOUPLED",
      code: [
        "protocol PolicyServicing: Sendable {",
        "  func fetchPolicy(id: PolicyID) async throws -> Policy",
        "  func cancelRenewal(id: PolicyID, token: AuthToken) async throws",
        "}",
      ],
      highlight: "Protocols ensure views never import concrete networking.",
    },
    metrics: [
      { label: "Pattern", value: "MVVM-C" },
      { label: "Testability", value: "100% Mockable" },
    ],
    description:
      "Establish strict layer boundaries. Coordinators isolate navigation from view controllers, ViewModels govern state machines, and protocols decouple data sources for testing.",
  },
  {
    id: "development",
    number: "03",
    title: "Native iOS Development",
    subtitle: "Modern Swift 6, SwiftUI & UIKit interoperability",
    category: "IMPLEMENTATION",
    icon: Layers,
    visualSnippet: {
      filename: "PolicyDetailView.swift",
      badge: "SWIFT 6 / MAINACTOR",
      code: [
        "@MainActor",
        "struct PolicyDetailView: View {",
        "  @State private var viewModel: PolicyViewModel",
        "  var body: some View { ... }",
        "}",
      ],
      highlight: "Declarative, reactive UI with compiler-enforced data-race safety.",
    },
    metrics: [
      { label: "Concurrency", value: "Swift 6 Strict" },
      { label: "Rendering", value: "120 FPS ProMotion" },
    ],
    description:
      "Craft high-performance user interfaces using SwiftUI and UIKit where precision lifecycle control is needed, enforcing Swift Concurrency and clean view-state binding.",
  },
  {
    id: "integration",
    number: "04",
    title: "API & Data Integration",
    subtitle: "URLSession, Codable schema parsing & auth tokens",
    category: "DATA PIPELINE",
    icon: Network,
    visualSnippet: {
      filename: "NetworkTransport.swift",
      badge: "TOKEN RETRY SAFE",
      code: [
        "actor NetworkClient: URLSessionTransport {",
        "  func execute<T: Decodable>(_ request: Endpoint) async throws -> T {",
        "    // Automatic 401 re-authentication mutex & serial refresh",
        "  }",
        "}",
      ],
      highlight: "Actor isolation prevents concurrent refresh race conditions.",
    },
    metrics: [
      { label: "Transport", value: "URLSession Actor" },
      { label: "Serialization", value: "Codable Strict" },
    ],
    description:
      "Build robust network layers with token refreshing mutexes, strict schema validation, offline cache synchronizers, and Bluetooth peripheral handshake handlers.",
  },
  {
    id: "testing",
    number: "05",
    title: "Testing & Quality Assurance",
    subtitle: "Unit mocks, UI automation & memory audit",
    category: "VERIFICATION",
    icon: ShieldCheck,
    visualSnippet: {
      filename: "PolicyViewModelTests.swift",
      badge: "XCTEST SUITE",
      code: [
        "func test_cancellationFlow_emitsConfirmedState() async {",
        "  mockService.stubResult = .success(cancelledPolicy)",
        "  await sut.confirmCancellation()",
        "  XCTAssertEqual(sut.state, .cancellationConfirmed)",
        "}",
      ],
      highlight: "Deterministic unit tests verify edge conditions without real servers.",
    },
    metrics: [
      { label: "Coverage", value: "Business Logic 90%+" },
      { label: "Instruments", value: "Zero Leaks" },
    ],
    description:
      "Validate code with isolated unit tests, mock services, and memory leak analysis in Xcode Instruments to eliminate retain cycles before staging.",
  },
  {
    id: "production",
    number: "06",
    title: "Production Release",
    subtitle: "Phased distribution, telemetry & zero-regression delivery",
    category: "DELIVERY",
    icon: Rocket,
    visualSnippet: {
      filename: "ReleaseManifest.json",
      badge: "APP STORE READY",
      code: [
        "{",
        '  "target": "App Store Phase 1 (1%)",',
        '  "crashFreeMetric": "99.98%",',
        '  "status": "Production Live"',
        "}",
      ],
      highlight: "Gradual rollouts backed by crash telemetry ensure stable releases.",
    },
    metrics: [
      { label: "Stability", value: "99.98% Crash-Free" },
      { label: "Rollout", value: "Phased 7-Day" },
    ],
    description:
      "Deploy through automated CI/CD pipelines, TestFlight staging, and gradual 7-day App Store rollouts with real-time crash monitoring and error telemetry.",
  },
];

export function EngineeringStoryFlow() {
  const [activeStepId, setActiveStepId] = useState<string>("requirement");
  const [showMobileCode, setShowMobileCode] = useState<boolean>(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const activeStep =
    LIFECYCLE_STEPS.find((s) => s.id === activeStepId) ?? LIFECYCLE_STEPS[0];

  return (
    <div
      ref={ref}
      className={`min-w-0 transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Mobile lifecycle selector: no off-screen partial tabs or horizontal page overflow. */}
      <div
        className="grid grid-cols-2 gap-2 pb-4 pt-1 md:hidden"
        role="tablist"
        aria-label="Engineering Lifecycle Navigation"
      >
        {LIFECYCLE_STEPS.map((step) => {
          const Icon = step.icon;
          const isSelected = step.id === activeStepId;
          return (
            <button
              key={step.id}
              role="tab"
              id={`lifecycle-mobile-tab-${step.id}`}
              aria-selected={isSelected}
              aria-controls={`lifecycle-panel-${step.id}`}
              onClick={() => setActiveStepId(step.id)}
              className={`flex min-h-12 min-w-0 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-all cursor-pointer ${
                isSelected
                  ? "liquid-glass-emerald border-accent/40 text-[var(--emerald-action-text)] shadow-xs font-semibold"
                  : "border-border bg-surface/55 text-foreground-muted hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <span className="shrink-0 font-mono-code text-[11px] text-accent font-bold">
                {step.number}
              </span>
              <Icon className="size-3.5 shrink-0" />
              <span className="min-w-0 break-words font-medium leading-tight">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tablet/Desktop Step Selector Pipeline Rail */}
      <div className="relative hidden overflow-x-auto pb-6 pt-1 md:block">
        <LiquidGlass
          variant="control"
          className="flex min-w-[680px] w-full items-center justify-between gap-1 rounded-2xl p-2 border border-border"
          role="tablist"
          aria-label="Engineering Lifecycle Navigation"
        >
          {LIFECYCLE_STEPS.map((step) => {
            const Icon = step.icon;
            const isSelected = step.id === activeStepId;
            return (
              <button
                key={step.id}
                role="tab"
                id={`lifecycle-tab-${step.id}`}
                aria-selected={isSelected}
                aria-controls={`lifecycle-panel-${step.id}`}
                onClick={() => setActiveStepId(step.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs transition-all cursor-pointer ${
                  isSelected
                    ? "liquid-glass-emerald text-[var(--emerald-action-text)] border border-accent/40 shadow-xs font-semibold"
                    : "text-foreground-muted hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <span className="font-mono-code text-[11px] text-accent font-bold">
                  {step.number}
                </span>
                <Icon className="size-3.5 shrink-0" />
                <span className="font-medium truncate">{step.title}</span>
              </button>
            );
          })}
        </LiquidGlass>
      </div>

      {/* Interactive Story Presentation Canvas */}
      <div
        id={`lifecycle-panel-${activeStep.id}`}
        role="tabpanel"
        aria-labelledby={`lifecycle-mobile-tab-${activeStep.id}`}
        className="min-w-0 overflow-hidden rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs mt-2 p-6 sm:p-8 lg:p-10 shadow-xl animate-in fade-in duration-300"
      >
        <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Narrative & Explanation */}
          <div className="min-w-0 lg:col-span-6 space-y-4">
            <div className="flex min-w-0 flex-wrap items-center gap-2.5">
              <span className="max-w-full break-words rounded-full px-2.5 py-0.5 font-mono-code text-[11px] sm:text-xs font-semibold bg-accent/15 text-accent border border-accent/30">
                {activeStep.category}
              </span>
              <span className="font-mono-code text-xs text-foreground-subtle">
                STAGE {activeStep.number} OF 06
              </span>
            </div>

            <h3 className="break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {activeStep.title}
            </h3>

            <p className="break-words font-mono-code text-xs font-semibold text-accent">
              {activeStep.subtitle}
            </p>

            <p className="break-words text-sm sm:text-base leading-relaxed text-foreground-muted">
              {activeStep.description}
            </p>

            {/* Clean Spec Metrics (No nested boxes) */}
            <div className="flex min-w-0 flex-wrap items-center gap-6 pt-4 border-t border-border/60">
              {activeStep.metrics.map((metric) => (
                <div key={metric.label} className="min-w-0">
                  <div className="break-words font-mono-code text-[11px] sm:text-xs text-foreground-subtle uppercase tracking-wider font-semibold">
                    {metric.label}
                  </div>
                  <div className="mt-0.5 break-words font-mono-code text-sm font-bold text-foreground">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Progressive Disclosure Toggle */}
            <div className="pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => setShowMobileCode(!showMobileCode)}
                aria-expanded={showMobileCode}
                className="flex w-full min-w-0 items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 font-mono-code text-xs font-semibold text-accent hover:border-accent/40 transition-all cursor-pointer"
              >
                <span className="min-w-0 flex-1 break-words text-left leading-snug">
                  {showMobileCode ? "Hide technical implementation" : "View technical implementation & code"}
                </span>
                <span className="shrink-0 whitespace-nowrap text-xs font-mono-code">
                  {showMobileCode ? "▲ Collapse" : "▼ Expand"}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Concrete Artifact Code View */}
          <div className={`min-w-0 max-w-full overflow-hidden lg:col-span-6 ${showMobileCode ? "block" : "hidden lg:block"}`}>
            <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-border-strong bg-[#0d120f] p-4 sm:p-5 shadow-2xl">
              {/* Terminal Chrome Bar */}
              <div className="flex min-w-0 flex-col gap-2 border-b border-neutral-800 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
                    <span className="size-2 rounded-full bg-[#ff5f57]" />
                    <span className="size-2 rounded-full bg-[#febc2e]" />
                    <span className="size-2 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="min-w-0 break-words font-mono-code text-xs text-neutral-300">
                    {activeStep.visualSnippet.filename}
                  </span>
                </div>
                <span className="max-w-full self-start break-words rounded-full px-2 py-0.5 font-mono-code text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 sm:shrink-0">
                  {activeStep.visualSnippet.badge}
                </span>
              </div>

              {/* Code Snippet */}
              <div className="mt-4 max-w-full overflow-hidden">
                <pre className="max-w-full overflow-x-auto whitespace-pre font-mono-code text-xs leading-relaxed text-neutral-300">
                  <code className="block min-w-max">
                    {activeStep.visualSnippet.code.map((line, i) => (
                      <span key={i} className="block py-0.5">
                        <span className="inline-block w-6 text-neutral-600 select-none">
                          {i + 1}
                        </span>
                        <span>{line}</span>
                      </span>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Engineering Takeaway */}
              <div className="mt-4 flex min-w-0 items-start gap-2 rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-3 text-xs text-emerald-200">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <span className="min-w-0 break-words leading-relaxed">
                  {activeStep.visualSnippet.highlight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
