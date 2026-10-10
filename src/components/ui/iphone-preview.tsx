"use client";

import { useState } from "react";
import {
  Battery,
  Bluetooth,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Layers,
  Radio,
  RefreshCw,
  ShoppingBag,
  Wifi,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useTheme } from "@/components/theme/theme-provider";

export function IPhonePreview() {
  const [activeFlow, setActiveFlow] = useState<"banking" | "commerce" | "device">(
    "banking"
  );
  // Subscribe to theme so component rerenders immediately on theme switch
  const { theme } = useTheme();

  return (
    <div className="relative mx-auto flex w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[375px] xl:max-w-[385px] flex-col items-center">
      {/* Subtle emerald ambient lighting behind the phone */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[56px] bg-emerald-500/[0.08] blur-3xl"
        aria-hidden="true"
      />

      {/* Floating Segmented Control (Liquid Glass) */}
      <LiquidGlass
        variant="control"
        className="mb-4 flex w-full items-center justify-between rounded-2xl p-1 shadow-md"
      >
        <button
          type="button"
          onClick={() => setActiveFlow("banking")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-medium transition-all cursor-pointer ${
            activeFlow === "banking"
              ? "bg-accent/15 text-accent border border-accent/30 shadow-xs font-semibold"
              : "text-foreground-muted hover:text-foreground"
          }`}
          aria-pressed={activeFlow === "banking"}
        >
          <CreditCard className="size-3.5" />
          <span>Banking</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFlow("commerce")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-medium transition-all cursor-pointer ${
            activeFlow === "commerce"
              ? "bg-accent/15 text-accent border border-accent/30 shadow-xs font-semibold"
              : "text-foreground-muted hover:text-foreground"
          }`}
          aria-pressed={activeFlow === "commerce"}
        >
          <ShoppingBag className="size-3.5" />
          <span>Commerce</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFlow("device")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-medium transition-all cursor-pointer ${
            activeFlow === "device"
              ? "bg-accent/15 text-accent border border-accent/30 shadow-xs font-semibold"
              : "text-foreground-muted hover:text-foreground"
          }`}
          aria-pressed={activeFlow === "device"}
        >
          <Bluetooth className="size-3.5" />
          <span>Hardware</span>
        </button>
      </LiquidGlass>

      {/* Hardware Chassis: Apple Device Frame (stays dark/metallic physical hardware) */}
      <div className="device-bezel relative aspect-[9/19] w-full rounded-[48px] border border-border-strong bg-[#18201b] p-3 shadow-2xl transition-all duration-300">
        {/* Dynamic Island: Physical hardware cutout stays near-black */}
        <div className="absolute left-1/2 top-4 z-20 flex h-6 w-28 -translate-x-1/2 items-center justify-between rounded-full bg-black px-2.5 shadow-inner">
          <div className="size-2.5 rounded-full bg-neutral-900" />
          <div className="size-2 rounded-full bg-emerald-950/60 ring-1 ring-emerald-900/40" />
        </div>

        {/* Inner Screen Canvas: Adapts dynamically and immediately to light and dark iOS theme */}
        <div
          data-app-theme={theme}
          className="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] bg-[var(--phone-screen-bg)] text-[var(--phone-text)] transition-colors duration-200"
        >
          {/* iOS Status Bar */}
          <div className="relative z-10 flex h-11 w-full items-center justify-between px-6 pt-1 text-[11px] font-semibold text-[var(--phone-text)] opacity-90">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 opacity-90">
              <span className="font-mono-code text-[10px]">5G</span>
              <Wifi className="size-3" />
              <Battery className="size-3.5" />
            </div>
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 overflow-y-auto px-4 pb-6 pt-1">
            {activeFlow === "banking" && (
              <div className="space-y-3">
                {/* Translucent Navigation Header */}
                <div className="flex items-center justify-between rounded-xl px-3 py-2 border border-[var(--phone-card-border)] bg-[var(--phone-bar-bg)] backdrop-blur-md shadow-xs">
                  <div>
                    <span className="font-mono-code text-[11px] uppercase tracking-wider text-accent font-semibold">
                      MVVM-C Flow
                    </span>
                    <h4 className="text-xs font-bold text-[var(--phone-text)]">
                      Policy Servicing Flow
                    </h4>
                  </div>
                  <span className="rounded-full px-2 py-0.5 font-mono-code text-[11px] font-medium bg-emerald-500/15 text-accent border border-emerald-500/25">
                    .active
                  </span>
                </div>

                {/* State Card: Verification */}
                <div className="rounded-2xl border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] p-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[var(--phone-text-subtle)]">
                      Verification
                    </span>
                    <span className="flex items-center gap-1 font-mono-code text-[11px] font-semibold text-accent">
                      <CheckCircle2 className="size-3.5" />
                      Completed
                    </span>
                  </div>
                </div>

                {/* State Card: Account Selection */}
                <div className="rounded-2xl border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] p-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[var(--phone-text-subtle)]">
                      Account Selection
                    </span>
                    <span className="flex items-center gap-1 font-mono-code text-[11px] font-semibold text-accent">
                      <CheckCircle2 className="size-3.5" />
                      Selected
                    </span>
                  </div>
                </div>

                {/* State Machine Inspector Badge */}
                <div className="rounded-xl p-2.5 font-mono-code text-[11px] border border-[var(--phone-card-border)] bg-[var(--phone-badge-bg)] text-[var(--phone-text-muted)]">
                  <div className="flex items-center justify-between">
                    <span>Coordinator State</span>
                    <span className="text-accent font-semibold">.readyForConfirmation</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span>Validation</span>
                    <span className="text-accent font-semibold">Passed</span>
                  </div>
                </div>

                {/* Flow Action Control */}
                <button
                  type="button"
                  className="w-full rounded-xl py-2.5 text-center text-xs font-semibold bg-accent text-white shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
                >
                  Confirm Update
                </button>
              </div>
            )}

            {activeFlow === "commerce" && (
              <div className="space-y-3">
                {/* Floating Translucent Navigation Bar */}
                <div className="flex items-center justify-between rounded-xl px-3 py-2 border border-[var(--phone-card-border)] bg-[var(--phone-bar-bg)] backdrop-blur-md shadow-xs">
                  <div>
                    <span className="font-mono-code text-[11px] uppercase tracking-wider text-accent font-semibold">
                      Commerce Pipeline
                    </span>
                    <h4 className="text-xs font-bold text-[var(--phone-text)]">Live Bakery Order</h4>
                  </div>
                  <span className="rounded-full px-2 py-0.5 font-mono-code text-[11px] font-medium bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                    #4812
                  </span>
                </div>

                {/* Solid Content Card */}
                <div className="rounded-2xl border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] p-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-medium text-[var(--phone-text)]">
                    <span>Oven Warm &amp; Packed</span>
                    <span className="text-accent font-semibold">En Route</span>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--phone-progress-track)]">
                    <div className="h-full w-3/4 rounded-full bg-accent" />
                  </div>
                  <p className="mt-2 text-[11px] text-[var(--phone-text-subtle)]">
                    ETA: 14 mins • Courier dispatched via stream
                  </p>
                </div>

                {/* Cart Preview (Solid Content) */}
                <div className="space-y-1.5 rounded-xl border border-[var(--phone-card-border)] bg-[var(--phone-card-sub-bg)] p-2.5 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--phone-text)] font-medium">Warm Chocolate Chunk x 6</span>
                    <span className="font-mono-code text-[var(--phone-text-muted)]">$16.50</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--phone-text)] font-medium">Double Chocolate Mint x 2</span>
                    <span className="font-mono-code text-[var(--phone-text-muted)]">$5.50</span>
                  </div>
                </div>

                {/* Architecture Indicator */}
                <div className="rounded-xl p-2 font-mono-code text-[11px] border border-[var(--phone-card-border)] bg-[var(--phone-badge-bg)] text-[var(--phone-text-muted)]">
                  <div className="flex items-center justify-between">
                    <span>Local Cache</span>
                    <span className="text-accent font-semibold">CoreData.synced</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span>Remote Stream</span>
                    <span className="font-semibold text-[var(--phone-text)]">Firebase RTDB</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl p-2 text-xs border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] shadow-xs">
                  <span className="text-[var(--phone-text-muted)] font-medium">Live Tracking Map</span>
                  <ChevronRight className="size-3.5 text-accent" />
                </div>
              </div>
            )}

            {activeFlow === "device" && (
              <div className="space-y-3">
                {/* Floating Translucent Navigation Bar */}
                <div className="flex items-center justify-between rounded-xl px-3 py-2 border border-[var(--phone-card-border)] bg-[var(--phone-bar-bg)] backdrop-blur-md shadow-xs">
                  <div>
                    <span className="font-mono-code text-[11px] uppercase tracking-wider text-accent font-semibold">
                      CoreBluetooth BLE
                    </span>
                    <h4 className="text-xs font-bold text-[var(--phone-text)]">Peripheral Sync</h4>
                  </div>
                  <span className="flex items-center gap-1 rounded-full px-2 py-0.5 font-mono-code text-[11px] font-medium bg-emerald-500/15 text-accent border border-emerald-500/25">
                    <Radio className="size-2.5 animate-pulse text-accent" />
                    Connected
                  </span>
                </div>

                {/* Solid Content Card */}
                <div className="rounded-2xl border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] p-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
                        <Bluetooth className="size-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[var(--phone-text)]">Mighty V2 Audio</div>
                        <div className="font-mono-code text-[11px] text-[var(--phone-text-subtle)]">
                          RSSI -54 dBm • MTU 512
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-[var(--phone-card-border)] pt-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--phone-text-muted)]">Playlist Transfer</span>
                      <span className="font-mono-code text-accent font-semibold">72% (48/64 tracks)</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--phone-progress-track)]">
                      <div className="h-full w-[72%] rounded-full bg-accent" />
                    </div>
                  </div>
                </div>

                {/* Protocol Stack Glass Card */}
                <div className="rounded-xl p-2.5 font-mono-code text-[11px] border border-[var(--phone-card-border)] bg-[var(--phone-badge-bg)] text-[var(--phone-text-muted)]">
                  <div className="flex items-center justify-between">
                    <span>Protocol Stack</span>
                    <span className="font-semibold text-[var(--phone-text)]">Chunked CBCharacteristic</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span>Audio Session</span>
                    <span className="text-accent font-semibold">AVAudioSession.active</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-medium border border-[var(--phone-card-border)] bg-[var(--phone-card-bg)] text-[var(--phone-text)] shadow-xs hover:bg-[var(--phone-screen-bg)] transition-all active:scale-[0.98]"
                >
                  <RefreshCw className="size-3 text-accent" />
                  Verify Handshake Packets
                </button>
              </div>
            )}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="relative pb-2 pt-1 text-center">
            <div className="mx-auto h-1 w-28 rounded-full bg-[var(--phone-home-bar)]" />
          </div>
        </div>
      </div>

      {/* Caption under visualization */}
      <div className="mt-3 flex items-center gap-2 text-center text-xs text-foreground-subtle">
        <Layers className="size-3 text-accent" />
        <span>Interactive conceptual iOS flows: Banking, Commerce &amp; BLE</span>
      </div>
    </div>
  );
}
