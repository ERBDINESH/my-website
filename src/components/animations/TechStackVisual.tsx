"use client";

import { useState } from "react";
import {
  Boxes,
  Layers,
  Network,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useInView } from "./use-in-view";

interface SkillItem {
  name: string;
  level: "Primary" | "Core" | "Advanced" | "Enterprise";
  context: string;
}

interface StackGroup {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  icon: typeof Layers;
  skills: SkillItem[];
}

const STACK_GROUPS: StackGroup[] = [
  {
    id: "build",
    title: "Build",
    eyebrow: "CORE PLATFORM",
    summary: "Native Apple platform development from modern declarative UI to legacy foundations.",
    icon: Layers,
    skills: [
      { name: "Swift", level: "Primary", context: "Modern Swift 5.9–6.0 with strict concurrency and actors" },
      { name: "SwiftUI", level: "Primary", context: "Declarative component trees, custom view modifiers & state bindings" },
      { name: "UIKit", level: "Core", context: "Custom layouts, precision view lifecycle & legacy interop" },
      { name: "Objective-C", level: "Enterprise", context: "Legacy code maintenance, bridging headers & runtime interoperability" },
    ],
  },
  {
    id: "architect",
    title: "Architect",
    eyebrow: "SYSTEM DESIGN",
    summary: "Structural patterns that keep applications maintainable and testable over years of iteration.",
    icon: Boxes,
    skills: [
      { name: "MVVM", level: "Primary", context: "Unidirectional data flow and reactive view-state machines" },
      { name: "MVVM-C", level: "Primary", context: "Coordinators abstracting navigation away from UI controllers" },
      { name: "Dependency Injection", level: "Core", context: "Protocol-oriented inversion of control for 100% test isolation" },
      { name: "SOLID Principles", level: "Core", context: "Interface segregation and single-responsibility domain boundaries" },
    ],
  },
  {
    id: "integrate",
    title: "Integrate",
    eyebrow: "CONNECTIVITY",
    summary: "Reliable data transport, authentication synchronization, and offline capabilities.",
    icon: Network,
    skills: [
      { name: "REST APIs & URLSession", level: "Primary", context: "Decoupled async HTTP clients with automatic retry logic" },
      { name: "Codable & JSON", level: "Primary", context: "Strict schema parsing, ISO-8601 transforms & error mapping" },
      { name: "Firebase", level: "Core", context: "Analytics, Crashlytics, Remote Config & push notifications" },
      { name: "WebSockets", level: "Advanced", context: "Real-time bi-directional messaging and event streams" },
      { name: "Swift Package Manager (SPM)", level: "Core", context: "Modular dependency management and internal framework distribution" },
      { name: "CoreBluetooth", level: "Enterprise", context: "Hardware peripheral connection, packet parsing & background sync" },
    ],
  },
  {
    id: "assure",
    title: "Assure",
    eyebrow: "VERIFICATION",
    summary: "Continuous quality verification, performance profiling, and deterministic testing.",
    icon: ShieldCheck,
    skills: [
      { name: "XCTest Suite", level: "Primary", context: "Unit tests, mock services & asynchronous expectation tests" },
      { name: "Accessibility & Dynamic Type", level: "Core", context: "VoiceOver labels, accessible traits & dynamic typography scaling" },
      { name: "Instruments Profiling", level: "Advanced", context: "Memory leak audits, retain cycle elimination & Time Profiler" },
      { name: "Production Debugging", level: "Enterprise", context: "Console logging, crash trace triage & race condition reproduction" },
    ],
  },
  {
    id: "ship",
    title: "Ship",
    eyebrow: "DISTRIBUTION",
    summary: "Automated delivery pipelines, code reviews, and phased App Store releases.",
    icon: Rocket,
    skills: [
      { name: "Git & Version Control", level: "Primary", context: "Feature branching, rebasing & structured architecture PR reviews" },
      { name: "CI/CD & Fastlane", level: "Core", context: "Automated linting, test suites, artifact signing & build distribution" },
      { name: "App Store Connect", level: "Primary", context: "Phased 7-day staged rollouts, TestFlight & compliance checks" },
      { name: "Azure DevOps", level: "Enterprise", context: "Enterprise backlog tracking, sprint boards & paired deliveries" },
    ],
  },
];

export function TechStackVisual() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showAllMobileDisciplines, setShowAllMobileDisciplines] = useState<boolean>(false);
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const displayedGroups =
    activeTab === "all"
      ? STACK_GROUPS
      : STACK_GROUPS.filter((g) => g.id === activeTab);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Category Filter Pills */}
      <div className="flex overflow-x-auto pb-4 pt-1 sm:pb-6">
        <LiquidGlass
          variant="control"
          className="flex min-w-[540px] sm:min-w-0 w-full items-center justify-between gap-1 rounded-2xl p-1.5 border border-border"
        >
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`flex-1 rounded-xl py-2 px-3 font-mono-code text-xs font-medium transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-accent/15 text-accent border border-accent/30 font-semibold shadow-xs"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            All 5 Disciplines
          </button>
          {STACK_GROUPS.map((group) => {
            const isSelected = activeTab === group.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveTab(group.id)}
                className={`flex-1 rounded-xl py-2 px-3 font-mono-code text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-accent/15 text-accent border border-accent/30 font-semibold shadow-xs"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {group.title}
              </button>
            );
          })}
        </LiquidGlass>
      </div>

      {/* OPEN TECHNICAL CAPABILITY MATRIX (Replaces repeated 3-column cards) */}
      <div className="space-y-6">
        {displayedGroups.map((group, groupIdx) => {
          const Icon = group.icon;
          const isHiddenOnMobile = activeTab === "all" && !showAllMobileDisciplines && groupIdx >= 2;

          return (
            <div
              key={group.id}
              className={`rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xs p-6 sm:p-8 transition-all hover:border-border-strong hover:bg-surface-raised/40 ${
                isHiddenOnMobile ? "hidden sm:block" : "block"
              }`}
            >
              <div className="grid gap-6 lg:grid-cols-[280px_1fr] items-start">
                {/* Left: Pillar Identity & Context */}
                <div className="space-y-2 border-b border-border/50 pb-4 lg:border-b-0 lg:pb-0 lg:border-r lg:pr-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/25">
                      <Icon className="size-4.5" />
                    </span>
                    <div>
                      <h4 className="text-xl font-bold tracking-tight text-foreground">
                        {group.title}
                      </h4>
                      <span className="font-mono-code text-[10px] text-accent font-semibold uppercase tracking-wider block">
                        {group.eyebrow}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] leading-relaxed text-foreground-muted pt-1">
                    {group.summary}
                  </p>
                </div>

                {/* Right: Flowing Tech Matrix Chips */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-2xl border border-border/60 bg-surface/80 p-3.5 transition-all hover:border-accent/40 hover:bg-surface-elevated"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground text-sm">
                          {skill.name}
                        </span>
                        <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono-code text-[10px] font-semibold text-accent border border-accent/20">
                          {skill.level}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">
                        {skill.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Mobile Progressive Disclosure Toggle when showing all disciplines */}
        {activeTab === "all" && (
          <div className="sm:hidden pt-2">
            <button
              type="button"
              onClick={() => setShowAllMobileDisciplines(!showAllMobileDisciplines)}
              aria-expanded={showAllMobileDisciplines}
              className="w-full flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 font-mono-code text-xs font-semibold text-accent hover:border-accent/40 transition-all cursor-pointer"
            >
              <span>
                {showAllMobileDisciplines
                  ? "Show primary disciplines only"
                  : "Explore remaining disciplines (Integrate, Assure, Ship)"}
              </span>
              <span className="text-[11px]">
                {showAllMobileDisciplines ? "▲ Collapse" : "▼ Expand"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
