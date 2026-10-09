"use client";

import { useState } from "react";
import {
  Bug,
  CheckCircle2,
  FileSearch,
  Filter,
  Flame,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useInView } from "./use-in-view";

interface DebugStep {
  id: string;
  number: string;
  name: string;
  stage: string;
  icon: typeof Bug;
  summary: string;
  technicalDetails: string;
  terminalOutput: string[];
}

const DEBUG_STEPS: DebugStep[] = [
  {
    id: "detected",
    number: "01",
    name: "Telemetry Alert",
    stage: "DETECTION",
    icon: Flame,
    summary: "Production monitoring flags 0.4% intermittent 401 Unauthorized errors during background policy polling.",
    technicalDetails: "High-latency cellular connections (4G/3G) trigger failures during parallel endpoint requests.",
    terminalOutput: [
      "[CRASHLYTICS ALERT] Warning: HTTP 401 spikes on /v2/policies/refresh",
      "Affected users: 342 over 24h | iOS 17.4+ | Network: Weak Cellular",
      "Triage priority: High (User logged out unexpectedly)",
    ],
  },
  {
    id: "logs",
    number: "02",
    name: "Log Inspection",
    stage: "TRIAGE",
    icon: FileSearch,
    summary: "Analyze unified OSLog traces and network correlation IDs to identify the sequence of events.",
    technicalDetails: "Two concurrent view models trigger separate token refreshes within 12ms of each other.",
    terminalOutput: [
      "12:04:01.104 [AuthNetwork] Token expired. Initiating refresh...",
      "12:04:01.116 [PolicySync] Token expired. Initiating SECOND refresh...",
      "12:04:01.450 [AuthNetwork] Refresh #1 succeeded. New Token [A] stored.",
      "12:04:01.780 [AuthNetwork] Refresh #2 succeeded. Old Token [A] invalidated -> 401 Error!",
    ],
  },
  {
    id: "reproduce",
    number: "03",
    name: "Reproduction Harness",
    stage: "REPRODUCTION",
    icon: Bug,
    summary: "Construct an isolated XCTest test harness with artificial network latency to reproduce deterministically.",
    technicalDetails: "Spawning 10 concurrent async tasks with simulated 400ms network jitter reproduces the failure 100% of the time.",
    terminalOutput: [
      "Test Suite 'TokenConcurrencyTests' started.",
      "Test Case 'test_concurrentRefreshRaceCondition()' failed (0.42 seconds).",
      "Assertion Failure: Expected 1 refresh call, got 2. State corrupted.",
    ],
  },
  {
    id: "root-cause",
    number: "04",
    name: "Root Cause Isolation",
    stage: "ANALYSIS",
    icon: Filter,
    summary: "Identify lack of task coalescing and thread-safety in the legacy shared token manager class.",
    technicalDetails: "Unsynchronized reference type permitted overlapping asynchronous executions without a mutex.",
    terminalOutput: [
      "[ROOT CAUSE IDENTIFIED]",
      "Class: TokenManager (Non-isolated reference type)",
      "Vulnerability: Lack of task coalescing allowed redundant flight requests",
      "Remedy: Swift Actor isolation with cached Task<AuthToken, Error>",
    ],
  },
  {
    id: "fix",
    number: "05",
    name: "Targeted Actor Fix",
    stage: "IMPLEMENTATION",
    icon: Zap,
    summary: "Convert TokenManager to a Swift actor and implement asynchronous task coalescing.",
    technicalDetails: "Subsequent requests await the in-flight Task instead of firing duplicate network requests.",
    terminalOutput: [
      "actor TokenManager {",
      "  private var activeRefreshTask: Task<AuthToken, Error>?",
      "  func validToken() async throws -> AuthToken {",
      "    if let task = activeRefreshTask { return try await task.value }",
      "    // Execute single unified refresh task & coalesce callers",
      "  }",
      "}",
    ],
  },
  {
    id: "test",
    number: "06",
    name: "Stress Suite & Verification",
    stage: "VERIFICATION",
    icon: ShieldCheck,
    summary: "Run 100 concurrent iterations under Xcode Instruments Thread Sanitizer to ensure zero race conditions.",
    technicalDetails: "All 100 tasks share the identical token without a single 401 failure or memory leak.",
    terminalOutput: [
      "Test Suite 'TokenConcurrencyTests' passed.",
      "Thread Sanitizer: 0 Data Races detected.",
      "Instruments Allocations: 0 Leaks detected.",
    ],
  },
  {
    id: "release",
    number: "07",
    name: "Phased Hotfix Release",
    stage: "DELIVERY",
    icon: CheckCircle2,
    summary: "Deploy via TestFlight and 7-day phased App Store release with real-time error telemetry monitoring.",
    technicalDetails: "Telemetry confirms authorization failure rate immediately drops from 0.4% to 0.00%.",
    terminalOutput: [
      "[APP STORE TELEMETRY]",
      "Release: v4.2.1 Hotfix",
      "401 Error Spikes: 0 incidents recorded in 72h",
      "Crash-free sessions: 99.99%",
    ],
  },
];

export function DebuggingFlow() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3);
  const [showMobileConsole, setShowMobileConsole] = useState<boolean>(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const activeStep = DEBUG_STEPS[activeStepIndex];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 lg:p-10 shadow-xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full px-2.5 py-0.5 font-mono-code text-[11px] font-semibold bg-accent/15 text-accent border border-accent/30">
                PRODUCTION PROBLEM SOLVING
              </span>
              <span className="font-mono-code text-xs text-foreground-subtle">
                Real-World Debugging &amp; Performance Triage
              </span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Production Incident Triage &amp; Root Cause Analysis
            </h3>
          </div>

          <LiquidGlass
            variant="control"
            className="rounded-xl px-3.5 py-1.5 font-mono-code text-xs text-foreground-muted border border-border"
          >
            Case: Concurrency Race Condition
          </LiquidGlass>
        </div>

        {/* Horizontal Timeline Rail */}
        <div className="mt-8 overflow-x-auto pb-4">
          <div className="flex min-w-[720px] items-center justify-between relative">
            {/* Background connecting rail */}
            <div
              className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-border-strong -z-10"
              aria-hidden="true"
            />

            {DEBUG_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex flex-col items-center gap-2 group transition-all cursor-pointer ${
                    isSelected ? "scale-105" : ""
                  }`}
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-2xl border transition-all ${
                      isSelected
                        ? "border-accent bg-accent text-surface-raised font-bold shadow-lg shadow-accent/25"
                        : isPast
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border bg-surface text-foreground-muted group-hover:border-border-strong"
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="text-center">
                    <span className="font-mono-code text-[10px] text-foreground-subtle block">
                      {step.number}
                    </span>
                    <span className="text-xs font-semibold text-foreground truncate max-w-[80px] block">
                      {step.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Detail Console View */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Triage Description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full px-2.5 py-0.5 font-mono-code text-[10px] font-bold bg-accent/15 text-accent border border-accent/30">
                STAGE {activeStep.number} {"//"} {activeStep.stage}
              </span>
            </div>

            <h4 className="text-xl font-bold text-foreground">
              {activeStep.name}
            </h4>

            <p className="text-sm leading-relaxed text-foreground">
              {activeStep.summary}
            </p>

            <div className="rounded-xl border border-border bg-surface p-3 text-xs text-foreground-muted">
              <span className="font-mono-code text-[10px] text-foreground-subtle uppercase tracking-wider block font-semibold mb-1">
                Engineering Assessment:
              </span>
              <p className="leading-relaxed">{activeStep.technicalDetails}</p>
            </div>

            {/* Step navigation controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="rounded-lg border border-border px-3 py-1.5 font-mono-code text-xs text-foreground-muted hover:text-foreground disabled:opacity-40 cursor-pointer"
              >
                ← Previous
              </button>
              <button
                type="button"
                disabled={activeStepIndex === DEBUG_STEPS.length - 1}
                onClick={() =>
                  setActiveStepIndex((prev) =>
                    Math.min(DEBUG_STEPS.length - 1, prev + 1)
                  )
                }
                className="liquid-glass-emerald rounded-lg px-3 py-1.5 font-mono-code text-xs font-semibold text-[var(--emerald-action-text)] disabled:opacity-40 cursor-pointer"
              >
                Next Step →
              </button>
            </div>

            {/* Mobile Progressive Disclosure Toggle */}
            <div className="pt-2 lg:hidden">
              <button
                type="button"
                onClick={() => setShowMobileConsole(!showMobileConsole)}
                aria-expanded={showMobileConsole}
                className="w-full flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 font-mono-code text-xs font-semibold text-accent hover:border-accent/40 transition-all cursor-pointer"
              >
                <span>{showMobileConsole ? "Hide terminal output" : "View diagnostic console & lldb output"}</span>
                <span className="text-[11px]">{showMobileConsole ? "▲ Collapse" : "▼ Expand"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Unified Terminal Console Log */}
          <div className={`lg:col-span-7 ${showMobileConsole ? "block" : "hidden lg:block"}`}>
            <div className="rounded-2xl border border-border-strong bg-[#0b0f0d] p-5 shadow-2xl font-mono-code text-xs">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-neutral-400">
                <div className="flex items-center gap-2">
                  <Terminal className="size-3.5 text-accent" />
                  <span>lldb / Unified Console Output</span>
                </div>
                <span className="text-[10px] text-emerald-400">TRACE CAPTURE</span>
              </div>

              <div className="mt-4 space-y-2 overflow-x-auto text-[11px] leading-relaxed text-neutral-300">
                {activeStep.terminalOutput.map((line, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-neutral-600 select-none">&gt;</span>
                    <span
                      className={
                        line.includes("ALERT") || line.includes("failed") || line.includes("401")
                          ? "text-amber-400"
                          : line.includes("passed") || line.includes("IDENTIFIED") || line.includes("succeeded")
                          ? "text-emerald-300"
                          : "text-neutral-300"
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-neutral-800 pt-3 text-[10px] text-neutral-500 flex items-center justify-between">
                <span>Correlation ID: req-8891-bnp-prod</span>
                <span className="text-accent">Resolved with 0 regressions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
