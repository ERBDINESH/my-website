"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useInView } from "./use-in-view";

type ModernizationView = "comparison" | "pipeline";

export function ModernizationFlow() {
  const [activeTab, setActiveTab] = useState<ModernizationView>("comparison");
  const [activeSide, setActiveSide] = useState<"legacy" | "modern">("modern");
  const [selectedPhase, setSelectedPhase] = useState<number>(2);
  const [showMobileSnippets, setShowMobileSnippets] = useState<boolean>(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const PHASES = [
    {
      step: "01",
      title: "Isolate Feature Boundary",
      action: "Define @objc Protocol Bridge",
      description:
        "Isolate legacy Objective-C controllers behind clean Swift protocols. Prevent legacy retain cycles from bleeding into new code.",
      badge: "BOUNDARY ENFORCED",
    },
    {
      step: "02",
      title: "Modernize State & Logic",
      action: "Extract to Swift @Observable ViewModel",
      description:
        "Move state management, calculation, and network orchestration into isolated Swift models with full unit test coverage.",
      badge: "100% TESTABLE",
    },
    {
      step: "03",
      title: "Migrate UI via UIHostingController",
      action: "Declarative SwiftUI Component Tree",
      description:
        "Replace bulky Storyboards and NIBs with reactive SwiftUI views embedded inside existing UIKit navigation stacks.",
      badge: "60/120 FPS FLUID",
    },
    {
      step: "04",
      title: "Decommission & Ship",
      action: "Zero-Regression Production Rollout",
      description:
        "Remove deprecated Objective-C delegates and verify zero memory retention cycles using Xcode Instruments.",
      badge: "ZERO REGRESSIONS",
    },
  ];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="rounded-3xl border border-border/80 bg-surface/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-xl">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full px-2.5 py-0.5 font-mono-code text-[11px] font-semibold bg-accent/15 text-accent border border-accent/30">
                LEGACY MODERNIZATION
              </span>
              <span className="font-mono-code text-xs text-foreground-subtle">
                Objective-C &amp; UIKit → Swift 6 &amp; SwiftUI
              </span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Incremental Architecture Migration Without Regressions
            </h3>
          </div>

          {/* Toggle between Comparison View and Migration Steps */}
          <LiquidGlass
            variant="control"
            className="flex items-center rounded-xl p-1 shadow-xs border border-border"
          >
            <button
              type="button"
              onClick={() => setActiveTab("comparison")}
              className={`rounded-lg px-3 py-1.5 font-mono-code text-xs font-medium transition-all cursor-pointer ${
                activeTab === "comparison"
                  ? "bg-accent/15 text-accent border border-accent/30 font-semibold"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              Side-by-Side Diff
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pipeline")}
              className={`rounded-lg px-3 py-1.5 font-mono-code text-xs font-medium transition-all cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-accent/15 text-accent border border-accent/30 font-semibold"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              4-Phase Strategy
            </button>
          </LiquidGlass>
        </div>

        {/* VIEW 1: COMPARISON VIEW */}
        {activeTab === "comparison" && (
          <div className="mt-8 space-y-6">
            {/* Mobile Switcher */}
            <div className="flex sm:hidden rounded-xl bg-surface p-1 border border-border">
              <button
                type="button"
                onClick={() => setActiveSide("legacy")}
                className={`flex-1 py-1.5 font-mono-code text-xs rounded-lg transition-all ${
                  activeSide === "legacy"
                    ? "bg-surface-raised text-amber-400 font-semibold"
                    : "text-foreground-muted"
                }`}
              >
                Legacy UIKit
              </button>
              <button
                type="button"
                onClick={() => setActiveSide("modern")}
                className={`flex-1 py-1.5 font-mono-code text-xs rounded-lg transition-all ${
                  activeSide === "modern"
                    ? "bg-accent/20 text-accent font-semibold"
                    : "text-foreground-muted"
                }`}
              >
                Modern SwiftUI
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center">
              {/* LEGACY SIDE */}
              <div
                className={`rounded-2xl border border-amber-900/30 bg-[#0a0e0c] p-5 shadow-inner ${
                  activeSide === "legacy" ? "block" : "hidden sm:block"
                }`}
              >
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="size-4 text-amber-500" />
                    <span className="font-mono-code text-xs font-bold text-amber-400">
                      Legacy Codebase (Objective-C / UIKit)
                    </span>
                  </div>
                  <span className="font-mono-code text-[10px] text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    TECHNICAL DEBT
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-neutral-400 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">✗</span>
                    <span>Massive UIViewController with 1,800+ lines of mixed concerns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">✗</span>
                    <span>Manual delegate cascades and prone-to-leak retain cycles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">✗</span>
                    <span>Complex storyboard XML merge conflicts in CI pipelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">✗</span>
                    <span>Tightly coupled network calls making isolated testing difficult</span>
                  </li>
                </ul>

                {/* Mobile Toggle */}
                <div className="pt-2 sm:hidden">
                  <button
                    type="button"
                    onClick={() => setShowMobileSnippets(!showMobileSnippets)}
                    aria-expanded={showMobileSnippets}
                    className="w-full flex items-center justify-between rounded-xl border border-neutral-800 bg-black/40 px-3.5 py-2 font-mono-code text-[11px] font-semibold text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
                  >
                    <span>{showMobileSnippets ? "Hide legacy snippet" : "View legacy Objective-C snippet"}</span>
                    <span>{showMobileSnippets ? "▲ Collapse" : "▼ Expand"}</span>
                  </button>
                </div>

                {/* Legacy Snippet */}
                <div className={`mt-4 rounded-xl border border-neutral-800 bg-black/60 p-3 font-mono-code text-[11px] text-neutral-400 ${showMobileSnippets ? "block" : "hidden sm:block"}`}>
                  <div className="text-[10px] text-neutral-500 mb-1">{"// PolicyDetailsViewController.m"}</div>
                  <pre className="overflow-x-auto text-neutral-300">
                    <code>
                      <span className="text-amber-400">@implementation</span> PolicyDetailsVC{"\n"}
                      - (<span className="text-blue-400">void</span>)viewDidLoad {"{\n"}
                      {"  "}[<span className="text-blue-400">super</span> viewDidLoad];{"\n"}
                      {"  "}[<span className="text-blue-400">self</span> setupTableViewDelegates];{"\n"}
                      {"  "}[<span className="text-blue-400">self</span> requestPolicyViaNetworkSync];{"\n"}
                      {"}"}{"\n"}
                      <span className="text-amber-400">@end</span>
                    </code>
                  </pre>
                </div>
              </div>

              {/* TRANSITION BRIDGE CONNECTOR (Desktop) */}
              <div className="hidden lg:flex flex-col items-center justify-center gap-2 px-1">
                <div className="h-10 w-[1.5px] bg-gradient-to-b from-amber-500/40 via-accent/60 to-accent" />
                <div className="flex flex-col items-center gap-1 rounded-xl border border-accent/30 bg-accent/10 px-2 py-2 text-center shadow-xs">
                  <span className="font-mono-code text-[9px] font-bold text-accent uppercase tracking-wider">
                    Adapter
                  </span>
                  <ArrowRight className="size-3 text-accent" />
                </div>
                <div className="h-10 w-[1.5px] bg-gradient-to-b from-accent to-accent/20" />
              </div>

              {/* MODERN SIDE */}
              <div
                className={`rounded-2xl border border-accent/40 bg-surface-raised p-5 shadow-lg ${
                  activeSide === "modern" ? "block" : "hidden sm:block"
                }`}
              >
                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-accent" />
                    <span className="font-mono-code text-xs font-bold text-accent">
                      Modern Architecture (Swift 6 / SwiftUI)
                    </span>
                  </div>
                  <span className="font-mono-code text-[10px] text-accent bg-emerald-500/15 px-2 py-0.5 rounded-full">
                    MAINTAINABLE
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-foreground-muted font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <span>Modular MVVM-C with discrete single-responsibility layers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <span>Type-safe async/await with compiler-checked data-race safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <span>Declarative SwiftUI state binding with automatic Dynamic Type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <span>Injected protocol dependencies allowing 100% mock unit testability</span>
                  </li>
                </ul>

                {/* Mobile Toggle */}
                <div className="pt-2 sm:hidden">
                  <button
                    type="button"
                    onClick={() => setShowMobileSnippets(!showMobileSnippets)}
                    aria-expanded={showMobileSnippets}
                    className="w-full flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-2 font-mono-code text-[11px] font-semibold text-accent hover:border-accent/60 transition-all cursor-pointer"
                  >
                    <span>{showMobileSnippets ? "Hide modern Swift snippet" : "View modern Swift 6 snippet"}</span>
                    <span>{showMobileSnippets ? "▲ Collapse" : "▼ Expand"}</span>
                  </button>
                </div>

                {/* Modern Snippet */}
                <div className={`mt-4 rounded-xl border border-border bg-[#0b0f0d] p-3 font-mono-code text-[11px] text-neutral-300 ${showMobileSnippets ? "block" : "hidden sm:block"}`}>
                  <div className="text-[10px] text-neutral-500 mb-1">{"// PolicyDetailsView.swift"}</div>
                  <pre className="overflow-x-auto text-neutral-300">
                    <code>
                      <span className="text-purple-400">@Observable</span>{"\n"}
                      <span className="text-blue-400">final class</span>{" "}
                      <span className="text-emerald-300">PolicyViewModel</span> {"{\n"}
                      {"  "}<span className="text-blue-400">var</span> state: <span className="text-emerald-300">ViewState</span> = .idle{"\n"}
                      {"  "}<span className="text-blue-400">func</span> load() <span className="text-blue-400">async</span> {"{\n"}
                      {"    "}state = .ready(<span className="text-blue-400">try await</span> service.fetch()){"\n"}
                      {"  }"}{"\n"}
                      {"}"}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Bridge Callout */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/80 bg-surface/50 p-4 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-accent" />
                <span className="font-semibold text-foreground">
                  Interop Strategy: UIHostingController mounts SwiftUI inside existing UINavigationController stacks.
                </span>
              </div>
              <span className="font-mono-code text-accent font-medium">
                Enables gradual, zero-downtime deprecation
              </span>
            </div>
          </div>
        )}

        {/* VIEW 2: 4-PHASE STRATEGY PIPELINE */}
        {activeTab === "pipeline" && (
          <div className="mt-8 space-y-6">
            {/* 4 Phase Cards with Inter-Card Step Connectors */}
            <div className="relative">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {PHASES.map((phase, idx) => {
                  const isSelected = selectedPhase === idx;
                  const isLast = idx === PHASES.length - 1;

                  return (
                    <div key={phase.step} className="relative">
                      {/* Discrete Connector Segment: Desktop (lg) between adjacent cards */}
                      {!isLast && (
                        <div
                          className="hidden lg:block absolute left-full top-[34px] -translate-y-1/2 w-4 h-[2px] z-0 pointer-events-none"
                          aria-hidden="true"
                        >
                          <div
                            className={`h-full w-full ${
                              idx < selectedPhase ? "bg-accent/80" : "bg-border-strong"
                            }`}
                          />
                        </div>
                      )}

                      {/* Discrete Connector Segment: Tablet (sm) between col 1 and 2 in each row */}
                      {(idx === 0 || idx === 2) && (
                        <div
                          className="hidden sm:block lg:hidden absolute left-full top-[34px] -translate-y-1/2 w-4 h-[2px] z-0 pointer-events-none"
                          aria-hidden="true"
                        >
                          <div
                            className={`h-full w-full ${
                              idx < selectedPhase ? "bg-accent/80" : "bg-border-strong"
                            }`}
                          />
                        </div>
                      )}

                      {/* Phase Card */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedPhase(idx)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedPhase(idx);
                          }
                        }}
                        aria-pressed={isSelected}
                        className={`relative z-10 cursor-pointer rounded-2xl border p-5 transition-all ${
                          isSelected
                            ? "border-accent bg-emerald-50 dark:bg-[#111a15] shadow-md ring-1 ring-accent/40"
                            : "border-border bg-surface hover:border-border-strong hover:bg-surface-raised"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex size-7 items-center justify-center rounded-xl bg-surface-raised font-mono-code text-xs font-bold text-accent border border-border">
                            {phase.step}
                          </span>
                          <span className="rounded-full px-2 py-0.5 font-mono-code text-[9px] bg-surface-raised border border-border text-foreground-subtle">
                            {phase.badge}
                          </span>
                        </div>

                        <h4 className="mt-3 font-bold text-foreground text-sm sm:text-base">
                          {phase.title}
                        </h4>

                        <p className="mt-1 font-mono-code text-[11px] text-accent font-semibold">
                          {phase.action}
                        </p>

                        <p className="mt-3 text-xs leading-relaxed text-foreground-muted">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-surface/50 p-5 text-xs text-foreground-muted">
              <div className="flex items-center gap-2 font-mono-code text-foreground font-semibold">
                <CheckCircle2 className="size-4 text-accent" />
                <span>Verified in Production Codebases:</span>
              </div>
              <p className="mt-2 leading-relaxed">
                Applied during banking and commerce feature development to modernize mission-critical policy flows and shopping carts without pausing active release cycles or introducing regressions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
