"use client";

import { useEffect, useState } from "react";
import {
  Boxes,
  CheckCircle2,
  Code2,
  Layers,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { IPhoneDuoPreview } from "@/components/ui/iphone-duo-preview";

type StageId = "swift" | "architecture" | "swiftui" | "production";

interface StageInfo {
  id: StageId;
  label: string;
  shortLabel: string;
  tagline: string;
  icon: typeof Code2;
}

const STAGES: StageInfo[] = [
  {
    id: "swift",
    label: "01 Swift Core",
    shortLabel: "Swift",
    tagline: "Type-safe models, strict concurrency & actors",
    icon: Code2,
  },
  {
    id: "architecture",
    label: "02 Architecture",
    shortLabel: "Architecture",
    tagline: "MVVM-C boundaries, protocols & dependency injection",
    icon: Boxes,
  },
  {
    id: "swiftui",
    label: "03 SwiftUI System",
    shortLabel: "SwiftUI",
    tagline: "Declarative component tree & dynamic layout",
    icon: Layers,
  },
  {
    id: "production",
    label: "04 Production App",
    shortLabel: "App Store",
    tagline: "Validated, crash-free native iOS delivery",
    icon: Smartphone,
  },
];

export function EngineeringHero() {
  const [activeStage, setActiveStage] = useState<StageId>("production");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-cycle through the transformation stages if playing
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStage((prev) => {
        const currentIndex = STAGES.findIndex((s) => s.id === prev);
        const nextIndex = (currentIndex + 1) % STAGES.length;
        return STAGES[nextIndex].id;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="relative mx-auto flex w-full max-w-full sm:max-w-[620px] md:max-w-[720px] lg:max-w-[840px] xl:max-w-[920px] flex-col items-center">
      {/* Luminous emerald ambient background glow */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[56px] bg-emerald-500/[0.07] blur-3xl"
        aria-hidden="true"
      />

      {/* Top Transformation Controller */}
      <LiquidGlass
        variant="control"
        className="mb-3.5 flex w-full flex-col gap-2 rounded-2xl p-2 shadow-md border border-border"
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 font-mono-code text-[11px] font-semibold text-accent">
            <Sparkles className="size-3" />
            <span className="uppercase tracking-wider">Engineering Pipeline</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 rounded-md px-2 py-0.5 font-mono-code text-[10px] text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause automated transformation" : "Play transformation"}
            >
              {isPlaying ? (
                <>
                  <Pause className="size-2.5 text-accent" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="size-2.5 text-accent" />
                  <span>Auto-Play</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveStage("swift");
                setIsPlaying(false);
              }}
              className="rounded-md p-1 text-foreground-subtle hover:text-foreground transition-colors cursor-pointer"
              title="Reset to Swift stage"
              aria-label="Reset transformation to initial stage"
            >
              <RotateCcw className="size-3" />
            </button>
          </div>
        </div>

        {/* 4 Stage Pills */}
        <div
          role="tablist"
          aria-label="Engineering Transformation Stages"
          className="grid grid-cols-4 gap-1 rounded-xl bg-surface/60 p-1"
        >
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isCurrent = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                role="tab"
                id={`stage-tab-${stage.id}`}
                aria-selected={isCurrent}
                aria-controls={`stage-panel-${stage.id}`}
                onClick={() => {
                  setActiveStage(stage.id);
                  setIsPlaying(false);
                }}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg py-1.5 px-1 text-center transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-accent/15 text-accent font-semibold border border-accent/30 shadow-xs"
                    : "text-foreground-muted hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <Icon className="size-3.5" />
                <span className="font-mono-code text-[10px] truncate max-w-full">
                  {stage.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </LiquidGlass>

      {/* Main Transformation Container */}
      <div className="relative w-full">
        {/* STAGE 1: SWIFT CORE */}
        {activeStage === "swift" && (
          <div
            id="stage-panel-swift"
            role="tabpanel"
            aria-labelledby="stage-tab-swift"
            className="animate-in fade-in zoom-in-95 duration-300 rounded-[36px] border border-border-strong bg-surface-raised p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent animate-ping" />
                <span className="font-mono-code text-xs font-semibold text-foreground">
                  Swift 6.0 Concurrency
                </span>
              </div>
              <span className="rounded-full px-2 py-0.5 font-mono-code text-[10px] font-semibold bg-emerald-500/15 text-accent border border-emerald-500/30">
                STRICT_SAFETY
              </span>
            </div>

            {/* Swift Syntax Block with clean typography */}
            <div className="mt-4 rounded-2xl border border-border bg-[#0b0f0d] p-4 font-mono-code text-xs text-neutral-300 shadow-inner">
              <div className="flex items-center justify-between text-[10px] text-neutral-500 pb-2 border-b border-neutral-800">
                <span>AccountEngine.swift</span>
                <span className="text-emerald-400">@MainActor isolated</span>
              </div>
              <pre className="mt-3 overflow-x-auto text-[11px] leading-relaxed text-neutral-300 font-mono-code">
                <code>
                  <span className="text-purple-400">@Observable</span>{"\n"}
                  <span className="text-blue-400">final class</span>{" "}
                  <span className="text-emerald-300">AccountEngine</span> {"{\n"}
                  {"  "}<span className="text-blue-400">private let</span>{" "}
                  <span className="text-neutral-200">service</span>:{" "}
                  <span className="text-emerald-300">BankingServicing</span>{"\n"}
                  {"  "}<span className="text-blue-400">var</span>{" "}
                  <span className="text-neutral-200">state</span>:{" "}
                  <span className="text-emerald-300">AccountState</span> = .idle{"\n\n"}
                  {"  "}<span className="text-blue-400">func</span>{" "}
                  <span className="text-yellow-300">synchronize</span>() <span className="text-blue-400">async</span> {"{\n"}
                  {"    "}state = .loading{"\n"}
                  {"    "}<span className="text-blue-400">let</span> res = <span className="text-blue-400">try await</span> service.fetch(){"\n"}
                  {"    "}state = .ready(res){"\n"}
                  {"  }"}{"\n"}
                  {"}"}
                </code>
              </pre>
            </div>

            {/* Verification metrics bar */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-border bg-surface p-2.5">
                <div className="font-mono-code text-[10px] text-foreground-subtle">DATA-RACE</div>
                <div className="mt-1 flex items-center gap-1 font-mono-code text-xs font-semibold text-accent">
                  <CheckCircle2 className="size-3" />
                  0 Compile Errors
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-2.5">
                <div className="font-mono-code text-[10px] text-foreground-subtle">MEMORY SAFETY</div>
                <div className="mt-1 flex items-center gap-1 font-mono-code text-xs font-semibold text-accent">
                  <ShieldCheck className="size-3" />
                  ARC Optimized
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted border-t border-border pt-3">
              <span className="font-mono-code text-[11px]">Step 1 of 4</span>
              <button
                type="button"
                onClick={() => setActiveStage("architecture")}
                className="font-mono-code text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                Assemble Architecture →
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: ARCHITECTURE BLOCKS */}
        {activeStage === "architecture" && (
          <div
            id="stage-panel-architecture"
            role="tabpanel"
            aria-labelledby="stage-tab-architecture"
            className="animate-in fade-in zoom-in-95 duration-300 rounded-[36px] border border-border-strong bg-surface-raised p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Boxes className="size-4 text-accent" />
                <span className="font-mono-code text-xs font-semibold text-foreground">
                  MVVM-C Contract Mesh
                </span>
              </div>
              <span className="font-mono-code text-[10px] text-foreground-muted">
                DECOUPLED LAYERS
              </span>
            </div>

            {/* Architecture Node Diagram */}
            <div className="mt-4 space-y-2.5">
              {/* Coordinator */}
              <div className="rounded-xl border border-accent/40 bg-accent/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-accent">
                    AppCoordinator
                  </span>
                  <span className="font-mono-code text-[9px] uppercase tracking-wider text-foreground-subtle">
                    Flow &amp; Routing
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-foreground-muted">
                  Manages view lifecycle without coupling UI screens to navigation controllers.
                </div>
              </div>

              {/* Vector connection */}
              <div className="flex justify-center -my-1">
                <div className="h-3 w-[2px] bg-accent/40" />
              </div>

              {/* ViewModel */}
              <div className="rounded-xl border border-border bg-surface p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-foreground">
                    PolicyViewModel
                  </span>
                  <span className="font-mono-code text-[9px] text-accent">@Observable</span>
                </div>
                <div className="mt-1 text-[11px] text-foreground-muted">
                  Transforms domain events into predictable UI state.
                </div>
              </div>

              {/* Vector connection */}
              <div className="flex justify-center -my-1">
                <div className="h-3 w-[2px] bg-accent/40" />
              </div>

              {/* Protocol Contract */}
              <div className="rounded-xl border border-border bg-surface p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-foreground">
                    &lt;BankingServicing&gt;
                  </span>
                  <span className="font-mono-code text-[9px] text-foreground-subtle">
                    DI Protocol Contract
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-foreground-muted">
                  <span>URLSession Network Transport</span>
                  <span className="text-accent font-mono-code">MockInjected</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted border-t border-border pt-3">
              <span className="font-mono-code text-[11px]">Step 2 of 4</span>
              <button
                type="button"
                onClick={() => setActiveStage("swiftui")}
                className="font-mono-code text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                Render SwiftUI UI →
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: SWIFTUI INTERFACE */}
        {activeStage === "swiftui" && (
          <div
            id="stage-panel-swiftui"
            role="tabpanel"
            aria-labelledby="stage-tab-swiftui"
            className="animate-in fade-in zoom-in-95 duration-300 rounded-[36px] border border-border-strong bg-surface-raised p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-accent" />
                <span className="font-mono-code text-xs font-semibold text-foreground">
                  SwiftUI Declarative Hierarchy
                </span>
              </div>
              <span className="rounded-full px-2 py-0.5 font-mono-code text-[10px] bg-accent/15 text-accent border border-accent/25">
                120 FPS FLUID
              </span>
            </div>

            {/* SwiftUI View Tree Mockup */}
            <div className="mt-4 space-y-3">
              {/* Dynamic Island Component */}
              <div className="flex items-center justify-between rounded-full bg-black px-4 py-2 text-white shadow-md">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono-code text-[10px]">OTP Secured</span>
                </div>
                <span className="font-mono-code text-[10px] text-emerald-400">99.98% Live</span>
              </div>

              {/* Declarative Glass Cards */}
              <div className="rounded-2xl border border-border bg-surface p-3.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-[11px] text-accent uppercase tracking-wider font-semibold">
                    PolicyServicingView
                  </span>
                  <span className="text-[10px] font-mono-code text-foreground-subtle">
                    SwiftUI Body
                  </span>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-surface-raised p-2 text-xs">
                    <span className="text-foreground">Policy #IT-90412</span>
                    <span className="font-mono-code text-[10px] text-accent font-semibold">
                      € 1,240.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-surface-raised p-2 text-xs">
                    <span className="text-foreground">Auto-Renewal Cancellation</span>
                    <span className="font-mono-code text-[10px] text-emerald-500">Scheduled</span>
                  </div>
                </div>
              </div>

              {/* View modifiers pill */}
              <div className="flex flex-wrap gap-1.5 font-mono-code text-[10px] text-foreground-subtle">
                <span className="rounded-md border border-border bg-surface px-2 py-1">
                  .navigationTitle()
                </span>
                <span className="rounded-md border border-border bg-surface px-2 py-1">
                  .dynamicTypeSize(...)
                </span>
                <span className="rounded-md border border-border bg-surface px-2 py-1 text-accent">
                  .animation(.spring)
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted border-t border-border pt-3">
              <span className="font-mono-code text-[11px]">Step 3 of 4</span>
              <button
                type="button"
                onClick={() => setActiveStage("production")}
                className="font-mono-code text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                Inspect Production Device →
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: PRODUCTION APP (Live Interactive iPhone Duo Hardware) */}
        {activeStage === "production" && (
          <div
            id="stage-panel-production"
            role="tabpanel"
            aria-labelledby="stage-tab-production"
            className="animate-in fade-in zoom-in-95 duration-300 w-full"
          >
            {/* Live Interactive iPhone Duo Preview */}
            <IPhoneDuoPreview />

            {/* Production Quality Seal Bar */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-surface-raised/80 px-3.5 py-2 font-mono-code text-[11px] text-foreground-subtle">
              <span className="flex items-center gap-1.5 text-accent font-semibold">
                <CheckCircle2 className="size-3.5" />
                App Store Ready
              </span>
              <span>Crash-Free: 99.98%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
