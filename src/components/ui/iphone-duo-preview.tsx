"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Battery,
  CheckCircle2,
  Cpu,
  CreditCard,
  Layers,
  Radio,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useTheme } from "@/components/theme/theme-provider";

type InspectorTab = "state" | "network" | "memory";

export function IPhoneDuoPreview() {
  const { theme } = useTheme();
  // Mobile pane switcher (Product vs Engineering Inspector)
  const [mobilePane, setMobilePane] = useState<"left" | "right">("left");
  // Right display interactive inspector tab
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>("state");
  // Left display action selection
  const [selectedAction, setSelectedAction] = useState<string>("vault");

  return (
    <div className="relative mx-auto flex w-full max-w-[340px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[840px] xl:max-w-[900px] flex-col items-center">
      {/* Subtle emerald ambient aura behind device */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-full bg-emerald-500/[0.08] blur-[100px] -z-10"
        aria-hidden="true"
      />

      {/* Mobile Connected Pane Switcher (< sm viewports) */}
      <div className="sm:hidden w-full mb-3">
        <LiquidGlass
          variant="control"
          className="flex w-full items-center justify-between rounded-xl p-1 shadow-sm border border-border"
        >
          <button
            type="button"
            onClick={() => setMobilePane("left")}
            aria-pressed={mobilePane === "left"}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-center font-mono-code text-[11px] transition-all cursor-pointer ${
              mobilePane === "left"
                ? "bg-accent/15 text-accent font-semibold border border-accent/30 shadow-xs"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>01 SwiftUI Product</span>
          </button>
          <button
            type="button"
            onClick={() => setMobilePane("right")}
            aria-pressed={mobilePane === "right"}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-center font-mono-code text-[11px] transition-all cursor-pointer ${
              mobilePane === "right"
                ? "bg-accent/15 text-accent font-semibold border border-accent/30 shadow-xs"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            <span className="size-1.5 rounded-full bg-sky-400" />
            <span>02 Engineering Engine</span>
          </button>
        </LiquidGlass>
      </div>

      {/* =========================================================================
          SINGLE LANDSCAPE-ORIENTED FOLDABLE DUAL-SCREEN CHASSIS
          Target ratio ~1.75:1 when opened, unified unibody frame, center hinge spine
         ========================================================================= */}
      <div className="w-full [perspective:1500px]">
        <div className="relative w-full rounded-[26px] sm:rounded-[34px] md:rounded-[40px] border border-neutral-700/70 dark:border-white/15 bg-gradient-to-b from-[#1b221e] via-[#121614] to-[#0c100d] p-2.5 sm:p-3 md:p-3.5 shadow-[-16px_28px_60px_-10px_rgba(0,0,0,0.85),0_18px_44px_-10px_rgba(16,185,129,0.08)] transition-all duration-300 motion-reduce:transform-none">
          {/* Conceptual Top Bezel Micro-Sensors & Hinge Knuckle Caps */}
          <div className="absolute left-1/2 top-1.5 z-30 hidden sm:flex -translate-x-1/2 items-center gap-8">
            <div className="size-1.5 rounded-full bg-neutral-900 border border-neutral-700/80" />
            {/* Top Hinge Knuckle Notch */}
            <div className="h-1.5 w-6 rounded-full bg-neutral-800 border border-neutral-700/60 shadow-inner" />
            <div className="size-1.5 rounded-full bg-neutral-900 border border-neutral-700/80" />
          </div>

          {/* DUAL DISPLAY INNER CAVITY (Wide Landscape Ratio ~ 1.75:1) */}
          <div className="relative flex w-full flex-col sm:flex-row items-stretch rounded-[20px] sm:rounded-[26px] md:rounded-[32px] bg-black/95 overflow-hidden">
            {/* ========================================================
                LEFT INNER DISPLAY: NATIVE iOS / SwiftUI PRODUCT
                Declarative Financial Treasury & Asset Vault
               ======================================================== */}
            <div
              className={`relative flex-1 min-w-0 transition-transform duration-500 ease-out sm:[transform:rotateY(3deg)] sm:origin-right motion-reduce:transform-none ${
                mobilePane === "left" ? "block" : "hidden sm:block"
              }`}
            >
              <div
                data-app-theme={theme}
                className="relative flex h-full min-h-[390px] sm:min-h-[410px] md:min-h-[440px] flex-col overflow-hidden rounded-[18px] sm:rounded-[24px] bg-[var(--phone-screen-bg)] text-[var(--phone-text)] transition-colors duration-200"
              >
                {/* iOS Compact Status Bar */}
                <div className="relative z-10 flex h-9 w-full items-center justify-between px-4 sm:px-5 pt-1 text-[11px] font-semibold text-[var(--phone-text)] opacity-95">
                  <span>9:41</span>
                  {/* Dynamic Island FaceID status */}
                  <div className="flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-0.5 border border-white/10 shadow-inner">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono-code text-[8.5px] text-emerald-400 font-semibold">
                      FaceID
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono-code text-[9px] font-bold">5G</span>
                    <Wifi className="size-3" />
                    <Battery className="size-3.5" />
                  </div>
                </div>

                {/* Left Screen Native Product Body */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-5 pb-3 pt-1 space-y-2.5">
                  {/* Title & ProMotion 120 FPS Chip */}
                  <div className="flex items-center justify-between pt-0.5">
                    <div>
                      <span className="font-mono-code text-[8px] uppercase tracking-wider text-accent font-bold block">
                        SwiftUI Production App
                      </span>
                      <h4 className="text-base sm:text-lg font-extrabold tracking-tight text-[var(--phone-text)] leading-tight">
                        Treasury Vault
                      </h4>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono-code text-[8px] font-bold text-accent border border-emerald-500/30">
                      120 FPS
                    </span>
                  </div>

                  {/* Net Liquidity Card */}
                  <div className="rounded-2xl border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] p-3 shadow-xs">
                    <div className="flex items-center justify-between text-[9.5px] text-[var(--phone-text-subtle)] font-mono-code">
                      <span>Total Portfolio Liquidity</span>
                      <span className="font-semibold text-emerald-400">+14.2% YTD</span>
                    </div>
                    <div className="mt-1 text-xl sm:text-2xl font-black tracking-tight text-[var(--phone-text)]">
                      € 48,290.00
                    </div>

                    {/* Quick Interactive Actions */}
                    <div className="mt-2.5 grid grid-cols-3 gap-1.5 pt-2 border-t border-[var(--phone-card-border)]">
                      {[
                        { id: "transfer", label: "Transfer", icon: ArrowUpRight },
                        { id: "vault", label: "Vault", icon: CreditCard },
                        { id: "yield", label: "Yield 4.8%", icon: Sparkles },
                      ].map((action) => {
                        const Icon = action.icon;
                        const isSelected = selectedAction === action.id;
                        return (
                          <button
                            key={action.id}
                            type="button"
                            onClick={() => setSelectedAction(action.id)}
                            className={`flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 px-1 text-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-accent/20 text-accent font-semibold border border-accent/35"
                                : "bg-[var(--phone-card-sub-bg)] text-[var(--phone-text-muted)] hover:bg-[var(--phone-card-bg)]"
                            }`}
                          >
                            <Icon className="size-3" />
                            <span className="font-mono-code text-[8.5px]">{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Enterprise Tier Card */}
                  <div className="rounded-xl border border-accent/25 bg-gradient-to-br from-emerald-950/30 to-surface/40 p-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex size-5 items-center justify-center rounded-md bg-accent/20 text-accent">
                          <ShieldCheck className="size-3" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-[var(--phone-text)]">
                            Enterprise Treasury Tier 1
                          </div>
                          <div className="font-mono-code text-[8px] text-accent">
                            Contactless • Instant Wire
                          </div>
                        </div>
                      </div>
                      <span className="font-mono-code text-[8.5px] text-[var(--phone-text-subtle)]">
                        •• 4092
                      </span>
                    </div>
                  </div>

                  {/* Recent Verified Settlement */}
                  <div className="rounded-xl border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] p-2 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-5 items-center justify-center rounded-md bg-emerald-500/15 text-accent font-bold text-[9px]">
                        +
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-[var(--phone-text)]">
                          SEPA Instant Settlement
                        </div>
                        <div className="font-mono-code text-[8px] text-[var(--phone-text-subtle)]">
                          Verified • 08:30 UTC
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-code text-[10px] font-bold text-emerald-400">
                        +€ 3,400.00
                      </div>
                      <div className="font-mono-code text-[7.5px] text-accent">
                        Settled
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Display Home Bar */}
                <div className="h-4 w-full flex items-center justify-center pb-1">
                  <div className="h-1 w-20 rounded-full bg-[var(--phone-home-bar)]" />
                </div>
              </div>
            </div>

            {/* ========================================================
                INTEGRATED CENTER HINGE / FOLDING SPINE
                Precision mechanical spine between displays inside the unibody chassis
               ======================================================== */}
            <div
              className="relative hidden sm:flex w-2.5 sm:w-3 md:w-3.5 shrink-0 flex-col items-center justify-between bg-neutral-950 py-2 shadow-inner z-20"
              aria-hidden="true"
            >
              {/* Left Shadow Crease (Inward Fold Depth) */}
              <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

              {/* Center Precision Mechanical Spine Hairline */}
              <div className="h-full w-[1.5px] bg-neutral-700/70 shadow-[0_0_6px_rgba(0,0,0,0.9)]" />

              {/* Right Shadow Crease (Inward Fold Depth) */}
              <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none" />
            </div>

            {/* ========================================================
                RIGHT INNER DISPLAY: ENGINEERING CONTEXT ENGINE
                “Product on the left. Engineering behind it on the right.”
               ======================================================== */}
            <div
              className={`relative flex-1 min-w-0 transition-transform duration-500 ease-out sm:[transform:rotateY(-3deg)] sm:origin-left motion-reduce:transform-none ${
                mobilePane === "right" ? "block" : "hidden sm:block"
              }`}
            >
              <div
                data-app-theme={theme}
                className="relative flex h-full min-h-[390px] sm:min-h-[410px] md:min-h-[440px] flex-col overflow-hidden rounded-[18px] sm:rounded-[24px] bg-[#090d0b] text-[var(--phone-text)] transition-colors duration-200"
              >
                {/* Engineering HUD Status Bar */}
                <div className="relative z-10 flex h-9 w-full items-center justify-between px-4 sm:px-5 pt-1 text-[11px] font-semibold text-[var(--phone-text)] opacity-95">
                  <div className="flex items-center gap-1.5">
                    <TerminalIcon className="size-3 text-accent" />
                    <span className="font-mono-code text-[8.5px] text-accent font-bold">
                      ENGINEERING ENGINE
                    </span>
                  </div>
                  {/* Dynamic Runtime Status */}
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 border border-emerald-500/30">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono-code text-[8px] text-emerald-400 font-semibold">
                      LIVE RUNTIME
                    </span>
                  </div>
                  <span className="font-mono-code text-[8.5px] text-foreground-subtle">
                    ARC CLEAN
                  </span>
                </div>

                {/* Right Screen Inspector Body */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-5 pb-3 pt-1 space-y-2.5">
                  {/* Subtitle & Tab Selector */}
                  <div>
                    <div className="flex items-center justify-between pb-1">
                      <div>
                        <span className="font-mono-code text-[8px] uppercase tracking-wider text-sky-400 font-bold block">
                          Architectural Inspector
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold tracking-tight text-[var(--phone-text)]">
                          Contextual Telemetry
                        </h4>
                      </div>
                      <span className="font-mono-code text-[8px] text-foreground-subtle">
                        Linked to Product UI
                      </span>
                    </div>

                    {/* 3 Inspector Tabs: State, Network, Memory */}
                    <div className="grid grid-cols-3 gap-1 rounded-xl bg-surface/70 p-1 border border-border/80">
                      {(
                        [
                          { id: "state", label: "State", icon: Layers },
                          { id: "network", label: "Network", icon: Radio },
                          { id: "memory", label: "Memory", icon: Cpu },
                        ] as const
                      ).map((tab) => {
                        const Icon = tab.icon;
                        const isCurrent = inspectorTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setInspectorTab(tab.id)}
                            className={`flex items-center justify-center gap-1 rounded-lg py-1 text-center font-mono-code text-[8.5px] transition-all cursor-pointer ${
                              isCurrent
                                ? "bg-accent/20 text-accent font-semibold border border-accent/30 shadow-xs"
                                : "text-foreground-subtle hover:text-foreground"
                            }`}
                          >
                            <Icon className="size-2.5" />
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* TAB 1: STATE & ARCHITECTURE */}
                  {inspectorTab === "state" && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="rounded-xl border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] p-2.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code text-[9.5px] text-accent font-bold">
                            @Observable AccountEngine
                          </span>
                          <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 font-mono-code text-[7.5px] text-emerald-400 border border-emerald-500/30">
                            .ready(Vault)
                          </span>
                        </div>
                        <div className="font-mono-code text-[8.5px] text-foreground-subtle leading-relaxed bg-[#060807] rounded-lg p-2 border border-neutral-800">
                          <div>
                            <span className="text-purple-400">selectedAction: </span>
                            <span className="text-emerald-300">.{selectedAction}</span>
                          </div>
                          <div>
                            <span className="text-purple-400">concurrency: </span>
                            <span className="text-emerald-300">MainActor Isolated</span>
                          </div>
                          <div>
                            <span className="text-purple-400">coordinator: </span>
                            <span className="text-emerald-300">AppCoordinator.navigate</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-accent/25 bg-accent/5 p-2 font-mono-code text-[8px] text-accent flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="size-3" />
                          Swift 6 Data-Race Free
                        </span>
                        <span className="font-bold">0 Violations</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: NETWORK & SERVICE TRANSPORT */}
                  {inspectorTab === "network" && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="rounded-xl border border-sky-500/25 bg-[var(--phone-card-bg)] p-2.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code text-[9.5px] text-sky-400 font-bold">
                            URLSession Transport
                          </span>
                          <span className="rounded-full bg-sky-500/15 px-1.5 py-0.5 font-mono-code text-[7.5px] text-sky-400 border border-sky-500/30">
                            HTTP/3 • 200 OK
                          </span>
                        </div>
                        <div className="font-mono-code text-[8.5px] text-foreground-subtle leading-relaxed bg-[#060807] rounded-lg p-2 border border-neutral-800">
                          <div>
                            <span className="text-sky-300">GET </span>
                            <span className="text-neutral-300">/v2/accounts/vault/sync</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">Latency: </span>
                            <span className="text-emerald-400 font-bold">38ms roundtrip</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">Security: </span>
                            <span className="text-neutral-300">TLS 1.3 Pinning Verified</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] p-2 text-[8px] font-mono-code flex items-center justify-between">
                        <span className="text-foreground-subtle">Codable Serialization</span>
                        <span className="text-accent font-semibold">Zero-Copy Sendable</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: MEMORY & PERFORMANCE */}
                  {inspectorTab === "memory" && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <div className="rounded-xl border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] p-2.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code text-[9.5px] text-foreground font-bold">
                            Xcode Instruments Profile
                          </span>
                          <span className="font-mono-code text-[8.5px] text-emerald-400 font-extrabold">
                            38.4 MB
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[7.5px] font-mono-code text-foreground-subtle">
                            <span>Resident Memory Footprint</span>
                            <span className="text-accent">ARC Clean</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
                            <div className="h-full w-[24%] rounded-full bg-accent" />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-accent/25 bg-accent/5 p-2 font-mono-code text-[8px] text-accent flex items-center justify-between">
                        <span>Retain Cycle Audit</span>
                        <span className="font-bold">0 Leaks (Weak Delegates)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Display Home Bar */}
                <div className="h-4 w-full flex items-center justify-center pb-1">
                  <div className="h-1 w-20 rounded-full bg-[var(--phone-home-bar)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conceptual Hardware Narrative Caption */}
      <div className="mt-3 text-center px-4">
        <p className="font-mono-code text-[11px] font-semibold text-accent">
          Dual-Screen iOS Engineering Concept
        </p>
        <p className="text-[11px] text-foreground-subtle mt-0.5">
          &ldquo;Build the product on one side, understand the engineering behind it on the other.&rdquo;
        </p>
      </div>
    </div>
  );
}

function TerminalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}
