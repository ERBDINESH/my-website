"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Cpu,
  FileCheck2,
  Lock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useInView } from "./use-in-view";

interface FilterStage {
  step: string;
  name: string;
  owner: string;
  role: string;
  verifies: string;
  icon: typeof Bot;
  status: string;
}

const GATES: FilterStage[] = [
  {
    step: "01",
    name: "AI Draft Generation",
    owner: "LLM / Copilot Assistant",
    role: "Drafts boilerplate schemas, mock datasets, and initial function structures in seconds.",
    verifies: "Syntactic structure & basic logic draft",
    icon: Bot,
    status: "ACCELERATION",
  },
  {
    step: "02",
    name: "Senior Engineer Review",
    owner: "Dineshbabu Elumalai (Lead Reviewer)",
    role: "Scrutinizes logic for domain correctness, idiomatic Swift design, and error recovery paths.",
    verifies: "Business edge cases & failure recovery",
    icon: UserCheck,
    status: "HUMAN SCRUTINY",
  },
  {
    step: "03",
    name: "Architecture Conformance",
    owner: "System Boundary Control",
    role: "Enforces MVVM-C separation, verifies protocol contracts, and prevents dependency leaking.",
    verifies: "Decoupled layers & protocol boundaries",
    icon: Cpu,
    status: "ENFORCEMENT",
  },
  {
    step: "04",
    name: "Deterministic Testing",
    owner: "Automated Test Harness",
    role: "Writes exhaustive unit mocks and edge condition tests that AI frequently omits.",
    verifies: "100% deterministic test coverage",
    icon: FileCheck2,
    status: "VALIDATION",
  },
  {
    step: "05",
    name: "Security & Memory Audit",
    owner: "Xcode Instruments & Compiler",
    role: "Verifies actor isolation, data-race safety, Keychain security, and zero retain cycles.",
    verifies: "Instruments audit & App Store safety",
    icon: Lock,
    status: "CERTIFIED",
  },
];

export function AIEngineeringFlow() {
  const [activeGateIndex, setActiveGateIndex] = useState<number>(1);
  const [showMobileComparison, setShowMobileComparison] = useState<boolean>(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const activeGate = GATES[activeGateIndex];

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
              <span className="rounded-full px-2.5 py-0.5 font-mono-code text-xs font-semibold bg-accent/15 text-accent border border-accent/30">
                AI + ENGINEERING OWNERSHIP
              </span>
              <span className="font-mono-code text-xs sm:text-[13px] text-foreground-subtle">
                Controlled Velocity, Not Autonomous Blind Faith
              </span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Engineering Judgement Over AI-Generated Code
            </h3>
          </div>

          <LiquidGlass
            variant="control"
            className="rounded-xl px-3.5 py-1.5 font-mono-code text-xs sm:text-[13px] text-accent border border-accent/30 shadow-xs"
          >
            Human In The Loop Architecture
          </LiquidGlass>
        </div>

        {/* Narrative Callout */}
        <div className="mt-6 border-b border-border/60 pb-6 text-sm sm:text-base leading-relaxed text-foreground-muted">
          <p>
            <span className="font-semibold text-foreground">
              AI accelerates code generation, but production stability demands human engineering ownership.{" "}
            </span>
            I leverage AI to eliminate boilerplate and prototype faster, while applying rigorous senior architectural review, strict Swift concurrency verification, and memory leak audits before any line touches production.
          </p>
        </div>

        {/* 5-Stage Verification Pipeline */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs sm:text-[13px] text-foreground-subtle mb-3">
            <span className="font-mono-code uppercase tracking-wider font-semibold">
              The 5-Gate Review Funnel
            </span>
            <span className="font-mono-code text-accent">
              Click gate to inspect verification criteria
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-5">
            {GATES.map((gate, idx) => {
              const Icon = gate.icon;
              const isSelected = activeGateIndex === idx;

              return (
                <button
                  key={gate.step}
                  type="button"
                  onClick={() => setActiveGateIndex(idx)}
                  className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent/60 bg-accent/10 shadow-md ring-1 ring-accent/30"
                      : "border-border bg-surface hover:border-border-strong hover:bg-surface-raised"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-xs font-bold text-accent">
                        GATE {gate.step}
                      </span>
                      <Icon className="size-3.5 text-accent" />
                    </div>
                    <div className="mt-2 text-xs sm:text-sm font-bold text-foreground">
                      {gate.name}
                    </div>
                  </div>

                  <div className="mt-3 border-t border-border/60 pt-2 font-mono-code text-[11px] sm:text-xs text-foreground-subtle">
                    {gate.status}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Gate Deep Dive Box */}
        <div className="mt-6 rounded-2xl border border-border-strong bg-[#0d120f] p-5 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-lg bg-emerald-500/10 font-mono-code text-xs font-bold text-accent border border-emerald-500/20">
                {activeGate.step}
              </span>
              <span className="font-mono-code text-xs sm:text-sm font-semibold text-neutral-200">
                {activeGate.name} — Verification Criteria
              </span>
            </div>
            <span className="rounded-full px-2.5 py-0.5 font-mono-code text-[11px] sm:text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {activeGate.owner}
            </span>
          </div>

          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <div className="font-mono-code text-xs text-neutral-400 uppercase tracking-wider">
                Engineering Responsibility
              </div>
              <p className="mt-1 text-sm sm:text-[15px] text-neutral-300 leading-relaxed">
                {activeGate.role}
              </p>
            </div>
            <div>
              <div className="font-mono-code text-xs text-neutral-400 uppercase tracking-wider">
                Verification Deliverable
              </div>
              <div className="mt-1 flex items-center gap-2 font-mono-code text-sm sm:text-[15px] text-emerald-300">
                <CheckCircle2 className="size-4 text-accent shrink-0" />
                <span>{activeGate.verifies}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Progressive Disclosure Toggle */}
        <div className="mt-4 sm:hidden">
          <button
            type="button"
            onClick={() => setShowMobileComparison(!showMobileComparison)}
            aria-expanded={showMobileComparison}
            className="w-full flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 font-mono-code text-xs font-semibold text-accent hover:border-accent/40 transition-all cursor-pointer"
          >
            <span>{showMobileComparison ? "Hide risk analysis" : "View AI Risk vs Senior Control Analysis"}</span>
            <span className="text-xs">{showMobileComparison ? "▲ Collapse" : "▼ Expand"}</span>
          </button>
        </div>

        {/* Contrast Breakdown: AI vs Production Reality */}
        <div className={`mt-6 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm ${showMobileComparison ? "block space-y-4 sm:space-y-0" : "hidden sm:grid"}`}>
          <div className="rounded-2xl border border-red-900/30 bg-surface-raised p-4">
            <div className="flex items-center gap-1.5 font-mono-code text-xs sm:text-sm text-red-400 font-bold">
              <AlertTriangle className="size-3.5 shrink-0" />
              <span>Uncontrolled AI Risks in iOS:</span>
            </div>
            <ul className="mt-2 space-y-2 leading-relaxed text-foreground-muted">
              <li>• Hidden memory retain cycles in trailing closures</li>
              <li>• Inappropriate dispatching across concurrency domains</li>
              <li>• Missed Apple Human Interface Guidelines and dynamic sizing</li>
              <li>• Rigid monolithic classes that resist unit testing</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-accent/40 bg-surface-raised p-4">
            <div className="flex items-center gap-1.5 font-mono-code text-xs sm:text-sm text-accent font-bold">
              <ShieldCheck className="size-3.5 shrink-0" />
              <span>Controlled AI Advantage:</span>
            </div>
            <ul className="mt-2 space-y-2 leading-relaxed text-foreground-muted">
              <li>• 3x faster initial prototyping and schema drafting</li>
              <li>• Senior engineer enforces MVVM-C contracts &amp; test harness</li>
              <li>• Instruments verification guarantees zero runtime leaks</li>
              <li>• Production code remains deterministic, maintainable, and audited</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
