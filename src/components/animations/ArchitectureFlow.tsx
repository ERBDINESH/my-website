"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Radio,
  RotateCcw,
} from "lucide-react";
import { useInView } from "./use-in-view";

interface ArchitectureNode {
  id: string;
  name: string;
  layer: string;
  role: string;
  swiftType: string;
  testStrategy: string;
  dependencies: string[];
  emits: string[];
}

const NODES: ArchitectureNode[] = [
  {
    id: "view",
    name: "View Layer",
    layer: "PRESENTATION",
    role: "Renders declarative UI and captures user input events.",
    swiftType: "SwiftUI View / UIViewController",
    testStrategy: "Snapshot tests & accessibility audit",
    dependencies: ["ViewModel state", "Design Tokens"],
    emits: ["User Intents", "Lifecycle Events"],
  },
  {
    id: "coordinator",
    name: "Coordinator",
    layer: "NAVIGATION",
    role: "Orchestrates routing and modal flows without coupling views to navigation hierarchy.",
    swiftType: "CoordinatorProtocol",
    testStrategy: "Navigation flow unit tests",
    dependencies: ["Parent Coordinator", "Factory Container"],
    emits: ["Route Transitions", "Deep Link Dispatch"],
  },
  {
    id: "viewmodel",
    name: "ViewModel",
    layer: "STATE MACHINE",
    role: "Processes intents, holds deterministic UI state, and calls domain use cases.",
    swiftType: "@Observable final class",
    testStrategy: "Isolated async XCTest assertions",
    dependencies: ["Domain Use Cases", "Mock Services"],
    emits: ["ViewState (idle, loading, ready, error)"],
  },
  {
    id: "usecase",
    name: "Domain Use Case",
    layer: "BUSINESS RULES",
    role: "Executes enterprise rules, calculations, and cross-service coordination.",
    swiftType: "Sendable UseCase struct",
    testStrategy: "Pure functional unit testing",
    dependencies: ["Service Protocols", "Repository Interfaces"],
    emits: ["Domain Entities", "Business Domain Errors"],
  },
  {
    id: "service",
    name: "Service Protocol",
    layer: "ABSTRACTION (DI)",
    role: "Defines contracts for data operations, isolating implementations for testability.",
    swiftType: "protocol BankingServicing: Sendable",
    testStrategy: "Mock Injection & Contract Verification",
    dependencies: ["Decoupled from Concrete Network"],
    emits: ["Typed Results via Swift Concurrency"],
  },
  {
    id: "network",
    name: "Network & Persistence",
    layer: "INFRASTRUCTURE",
    role: "Executes serialized HTTP requests with URLSession and manages local offline caches.",
    swiftType: "actor NetworkClient: URLSessionTransport",
    testStrategy: "HTTP stubbing & integration tests",
    dependencies: ["URLSession", "SQLite / Keychain"],
    emits: ["Decoded Codable Models", "HTTP Statuses"],
  },
];

// Complete 6-step request trace rigorously traversing through Coordinator
const TRACE_STEPS = [0, 1, 2, 3, 4, 5];

export function ArchitectureFlow() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("viewmodel");
  const [simulatingStep, setSimulatingStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isTraceFinished, setIsTraceFinished] = useState<boolean>(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const selectedNode =
    NODES.find((n) => n.id === selectedNodeId) ?? NODES[2];

  function runFlowSimulation() {
    setCompletedSteps([]);
    setIsTraceFinished(false);
    setSimulatingStep(0);
    setSelectedNodeId(NODES[0].id);

    TRACE_STEPS.forEach((stepIdx, idx) => {
      setTimeout(() => {
        setSimulatingStep(stepIdx);
        setSelectedNodeId(NODES[stepIdx].id);
        setCompletedSteps(TRACE_STEPS.slice(0, idx));

        if (idx === TRACE_STEPS.length - 1) {
          setTimeout(() => {
            setSimulatingStep(null);
            setCompletedSteps([...TRACE_STEPS]);
            setIsTraceFinished(true);
          }, 1100);
        }
      }, (idx + 1) * 800);
    });
  }

  function resetSimulation() {
    setSimulatingStep(null);
    setCompletedSteps([]);
    setIsTraceFinished(false);
    setSelectedNodeId("coordinator");
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
              <span className="rounded-full px-2.5 py-0.5 font-mono-code text-[11px] font-semibold bg-accent/15 text-accent border border-accent/30">
                SYSTEM DESIGN
              </span>
              <span className="font-mono-code text-xs text-foreground-subtle">
                Unidirectional Flow &amp; Protocol Boundaries
              </span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Production Architecture Thinking
            </h3>
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
                  <span>Replay Request Trace</span>
                </>
              ) : (
                <>
                  <Play className="size-3" />
                  <span>
                    {simulatingStep !== null
                      ? `Tracing: ${NODES[simulatingStep].name} (${simulatingStep + 1}/6)...`
                      : "Simulate Request Trace"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Exact Request Trace Breadcrumb Pipeline */}
        <div className="mt-5 overflow-x-auto pb-1">
          <div className="flex min-w-[620px] items-center gap-1.5 rounded-2xl border border-border/80 bg-surface/80 p-2.5 font-mono-code text-[11px]">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-foreground-subtle shrink-0">
              Trace Sequence:
            </span>
            {NODES.map((node, i) => {
              const isActive = simulatingStep === i;
              const isDone = completedSteps.includes(i);
              return (
                <div key={node.id} className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`rounded-lg px-2 py-0.5 transition-all ${
                      isActive
                        ? "border border-emerald-500/50 bg-emerald-500/20 font-bold text-emerald-300 ring-2 ring-emerald-500/30 animate-pulse"
                        : isDone
                          ? "border border-accent/30 bg-accent/15 font-semibold text-accent"
                          : "border border-border/40 text-foreground-subtle"
                    }`}
                  >
                    {node.name}
                  </span>
                  {i < NODES.length - 1 && (
                    <ArrowRight
                      className={`size-3 transition-colors ${
                        isDone ? "text-accent" : "text-foreground-subtle/30"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Architecture Mesh */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: 6 Interactive Architecture Nodes */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-foreground-subtle pb-1">
              <span className="font-mono-code uppercase tracking-wider">
                Component Pipeline (Click to Inspect)
              </span>
              <span className="font-mono-code text-[11px] text-accent">
                {simulatingStep !== null ? "Trace Active..." : "Interactive Nodes"}
              </span>
            </div>

            {NODES.map((node, idx) => {
              const isSelected = selectedNode.id === node.id;
              const isSimulating = simulatingStep === idx;
              const isCompleted = completedSteps.includes(idx);

              return (
                <div key={node.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full text-left rounded-2xl border p-4 transition-all cursor-pointer ${
                      isSimulating
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
                          className={`flex size-6 items-center justify-center rounded-lg font-mono-code text-xs font-bold border transition-colors ${
                            isSimulating
                              ? "bg-emerald-400 text-black border-emerald-300 shadow-sm animate-pulse"
                              : isCompleted
                                ? "bg-accent/20 text-accent border-accent/40"
                                : "bg-surface-raised text-accent border-border"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground text-sm sm:text-base">
                              {node.name}
                            </span>
                            {isSimulating && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/25 px-2 py-0.5 font-mono-code text-[9px] font-bold text-emerald-300 border border-emerald-500/40">
                                <Radio className="size-2.5 animate-spin" />
                                ACTIVE
                              </span>
                            )}
                            {isCompleted && !isSimulating && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-1.5 py-0.5 font-mono-code text-[9px] font-semibold text-accent">
                                <CheckCircle2 className="size-2.5" />
                                TRACED
                              </span>
                            )}
                          </div>
                          <div className="font-mono-code text-[11px] text-foreground-subtle">
                            {node.swiftType}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full px-2 py-0.5 font-mono-code text-[10px] text-foreground-subtle bg-surface-raised border border-border">
                          {node.layer}
                        </span>
                        <ArrowRight
                          className={`size-3.5 transition-transform ${
                            isSelected ? "text-accent translate-x-1" : "text-foreground-subtle/50"
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Visual connector line between steps - turns emerald when step completed */}
                  {idx < NODES.length - 1 && (
                    <div className="flex justify-center my-0.5" aria-hidden="true">
                      <div
                        className={`h-2.5 w-[2px] transition-colors duration-500 ${
                          completedSteps.includes(idx) ? "bg-accent shadow-xs" : "bg-border-strong"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Node Deep-Dive Inspector */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl border border-border-strong bg-surface-raised p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono-code text-[11px] font-bold text-accent uppercase tracking-wider">
                  Node Inspector
                </span>
                <span className="rounded-full px-2 py-0.5 font-mono-code text-[10px] bg-accent/15 text-accent border border-accent/25">
                  {selectedNode.layer}
                </span>
              </div>

              <h4 className="mt-4 text-xl font-bold text-foreground">
                {selectedNode.name}
              </h4>
              <p className="mt-1 font-mono-code text-xs text-accent">
                {selectedNode.swiftType}
              </p>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-foreground-muted">
                {selectedNode.role}
              </p>

              {/* Architectural Attributes */}
              <div className="mt-5 space-y-3 border-t border-border pt-4 text-xs">
                <div>
                  <span className="font-mono-code text-[10px] text-foreground-subtle uppercase tracking-wider font-semibold">
                    Testability &amp; Isolation:
                  </span>
                  <div className="mt-1 flex items-center gap-1.5 font-mono-code text-xs text-foreground font-medium">
                    <CheckCircle2 className="size-3.5 text-accent shrink-0" />
                    <span>{selectedNode.testStrategy}</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono-code text-[10px] text-foreground-subtle uppercase tracking-wider font-semibold">
                    Inbound Dependencies:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedNode.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono-code text-[10px] text-foreground-muted"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono-code text-[10px] text-foreground-subtle uppercase tracking-wider font-semibold">
                    Outbound Emission:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedNode.emits.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-accent/20 bg-accent/5 px-2 py-0.5 font-mono-code text-[10px] text-accent"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Protocol decoupling note */}
              <div className="mt-5 rounded-xl border border-border bg-surface p-3 font-mono-code text-[11px] text-foreground-subtle leading-relaxed">
                <span className="text-accent font-semibold">DI Pattern: </span>
                Layer boundaries are decoupled via protocol injection. Unit tests swap concrete instances for mocks without compiling network or UI code.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
