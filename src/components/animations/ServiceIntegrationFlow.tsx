"use client";

import { useState } from "react";
import {
  Database,
  FileCode2,
  HardDrive,
  Key,
  Network,
  Play,
  ShieldCheck,
} from "lucide-react";
import { useInView } from "./use-in-view";

interface IntegrationStage {
  id: string;
  step: string;
  title: string;
  layer: string;
  icon: typeof Network;
  responsibility: string;
  swiftSnippet: string[];
  reliabilityFeature: string;
}

const STAGES: IntegrationStage[] = [
  {
    id: "endpoint",
    step: "01",
    title: "Type-Safe Endpoint Contract",
    layer: "API SPECIFICATION",
    icon: FileCode2,
    responsibility: "Strict enum-based endpoint definition ensuring compile-time path and parameter safety.",
    swiftSnippet: [
      "enum BankingEndpoint: APIEndpoint {",
      "  case fetchPolicies(accountID: String)",
      "  case cancelRenewal(policyID: String, token: String)",
      "  var path: String { ... }",
      "}",
    ],
    reliabilityFeature: "No raw string URLs in application code",
  },
  {
    id: "auth",
    step: "02",
    title: "Auth Interceptor & Token Mutex",
    layer: "SECURITY LAYER",
    icon: Key,
    responsibility: "Injects signed OAuth headers and coalesces concurrent 401 refresh requests using a Swift Actor.",
    swiftSnippet: [
      "actor TokenManager {",
      "  private var activeTask: Task<AuthToken, Error>?",
      "  func validToken() async throws -> AuthToken {",
      "    if let task = activeTask { return try await task.value }",
      "    // Single flight token refresh",
      "  }",
      "}",
    ],
    reliabilityFeature: "Zero refresh race conditions under concurrent network loads",
  },
  {
    id: "transport",
    step: "03",
    title: "URLSession Async Transport",
    layer: "NETWORK ENGINE",
    icon: Network,
    responsibility: "Native async/await HTTP transport with SSL certificate pinning, custom timeouts, and exponential retry.",
    swiftSnippet: [
      "let (data, response) = try await session.data(for: request)",
      "guard let http = response as? HTTPURLResponse else { throw NetError.invalidResponse }",
      "guard (200...299).contains(http.statusCode) else { throw NetError.http(http.statusCode) }",
    ],
    reliabilityFeature: "Respects Low Data Mode & background network execution",
  },
  {
    id: "decoding",
    step: "04",
    title: "Codable Strict Schema Parsing",
    layer: "SERIALIZATION",
    icon: Database,
    responsibility: "Strict JSON deserialization with ISO-8601 date decoding and isolated schema mismatch handling.",
    swiftSnippet: [
      "let decoder = JSONDecoder()",
      "decoder.dateDecodingStrategy = .iso8601",
      "let result = try decoder.decode(PolicyPayload.self, from: data)",
    ],
    reliabilityFeature: "Catches unexpected backend schema drifts gracefully",
  },
  {
    id: "cache",
    step: "05",
    title: "Offline Persistence & State Sync",
    layer: "LOCAL STORAGE",
    icon: HardDrive,
    responsibility: "Atomically stores verified payloads in local Core Data / SQLite cache for seamless offline browsing.",
    swiftSnippet: [
      "await localStore.persist(policies: result.items)",
      "// Notify UI via @Observable repository stream",
      "state = .ready(result.items)",
    ],
    reliabilityFeature: "Guarantees offline availability during connectivity drops",
  },
];

export function ServiceIntegrationFlow() {
  const [selectedStageId, setSelectedStageId] = useState<string>("auth");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedIndex, setSimulatedIndex] = useState<number | null>(null);
  const [showMobileSnippet, setShowMobileSnippet] = useState(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const activeStage =
    STAGES.find((s) => s.id === selectedStageId) ?? STAGES[1];

  function runTraceSimulation() {
    setIsSimulating(true);
    const indices = [0, 1, 2, 3, 4];
    indices.forEach((idx, i) => {
      setTimeout(() => {
        setSimulatedIndex(idx);
        setSelectedStageId(STAGES[idx].id);
        if (i === indices.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setSimulatedIndex(null);
          }, 1200);
        }
      }, (i + 1) * 750);
    });
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 lg:p-10 shadow-xl">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full px-2.5 py-0.5 font-mono-code text-xs font-semibold bg-accent/15 text-accent border border-accent/30">
                DATA &amp; NETWORKING ARCHITECTURE
              </span>
              <span className="font-mono-code text-xs sm:text-[13px] text-foreground-subtle">
                URLSession • Actors • Codable • Offline Cache
              </span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Resilient API &amp; Service Integration Pipeline
            </h3>
          </div>

          <button
            type="button"
            onClick={runTraceSimulation}
            disabled={isSimulating}
            className="liquid-glass-emerald inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono-code text-xs sm:text-[13px] font-semibold text-[var(--emerald-action-text)] transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="size-3" />
            <span>Simulate Request Pipeline</span>
          </button>
        </div>

        {/* 5 Pipeline Stages */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Interactive Stage Cards */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-[13px] text-foreground-subtle pb-1">
              <span className="font-mono-code uppercase tracking-wider">
                Pipeline Stages (Click to Inspect)
              </span>
              <span className="font-mono-code text-xs text-accent">
                {isSimulating ? "Executing Trace..." : "5 Safe Stages"}
              </span>
            </div>

            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStage.id === stage.id;
              const isPulsing = simulatedIndex === idx;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`w-full text-left rounded-2xl border p-4 transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent/60 bg-accent/10 shadow-md ring-1 ring-accent/30"
                      : "border-border bg-surface hover:border-border-strong hover:bg-surface-raised"
                  } ${isPulsing ? "ring-2 ring-emerald-400 bg-emerald-500/20" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-xl bg-surface-raised font-mono-code text-xs font-bold text-accent border border-border">
                        {stage.step}
                      </span>
                      <div>
                        <div className="font-bold text-foreground text-sm sm:text-base">
                          {stage.title}
                        </div>
                        <div className="font-mono-code text-[11px] sm:text-xs text-foreground-subtle">
                          {stage.layer}
                        </div>
                      </div>
                    </div>
                    <Icon className="size-4 text-accent" />
                  </div>
                </button>
              );
            })}
            {/* Mobile Progressive Disclosure Toggle */}
            <div className="pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => setShowMobileSnippet(!showMobileSnippet)}
                aria-expanded={showMobileSnippet}
                className="w-full flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 font-mono-code text-xs font-semibold text-accent hover:border-accent/40 transition-all cursor-pointer"
              >
                <span>{showMobileSnippet ? "Hide Swift implementation" : "View Swift implementation & code"}</span>
                <span className="text-xs">{showMobileSnippet ? "▲ Collapse" : "▼ Expand"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Code & Verification Inspector */}
          <div className={`lg:col-span-6 ${showMobileSnippet ? "block" : "hidden lg:block"}`}>
            <div className="rounded-2xl border border-border-strong bg-[#0d120f] p-5 shadow-2xl font-mono-code text-xs">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm sm:text-base text-neutral-200 font-bold">
                    {activeStage.title}
                  </span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {activeStage.layer}
                </span>
              </div>

              {/* Code Snippet */}
              <div className="mt-4 rounded-xl border border-neutral-800 bg-black/60 p-3.5">
                <pre className="overflow-x-auto text-xs leading-relaxed text-neutral-300 font-mono-code">
                  <code>
                    {activeStage.swiftSnippet.map((line, i) => (
                      <div key={i} className="py-0.5">
                        <span className="inline-block w-6 text-neutral-600 select-none">
                          {i + 1}
                        </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Responsibility Description */}
              <div className="mt-4 space-y-2.5 text-xs sm:text-[13.5px]">
                <div className="text-neutral-300 font-sans leading-relaxed">
                  {activeStage.responsibility}
                </div>

                <div className="flex items-start gap-2 rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-3 text-emerald-200">
                  <ShieldCheck className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-sans text-xs sm:text-[13.5px]">
                    <span className="font-bold text-accent">Reliability Guard: </span>
                    {activeStage.reliabilityFeature}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
