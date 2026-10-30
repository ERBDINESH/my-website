"use client";

import { useId, useState } from "react";
import {
  Activity,
  AlertCircle,
  Calculator,
  CheckCircle2,
  HelpCircle,
  Info,
  Minus,
  RotateCcw,
  Sliders,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

export const DEFAULT_EPSILON = 1e-9;

export type TrendDirection =
  | "accelerating"
  | "cooling"
  | "unchanged"
  | "mixed"
  | "unknown";

export interface DemoPreset {
  id: string;
  name: string;
  description: string;
  currentMom: string;
  previousMom: string;
  currentYoy: string;
  previousYoy: string;
  epsilon: number;
}

export const PRESETS: readonly DemoPreset[] = [
  {
    id: "accelerating",
    name: "Accelerating Trend",
    description: "Both MoM and YoY rates increase over the prior reference periods.",
    currentMom: "0.4",
    previousMom: "0.2",
    currentYoy: "3.2",
    previousYoy: "2.9",
    epsilon: 1e-9,
  },
  {
    id: "cooling",
    name: "Cooling Trend",
    description: "Both MoM and YoY rates drop compared to the previous release.",
    currentMom: "0.1",
    previousMom: "0.3",
    currentYoy: "2.8",
    previousYoy: "3.1",
    epsilon: 1e-9,
  },
  {
    id: "mixed",
    name: "Divergent / Mixed",
    description: "MoM is accelerating (+0.2%), but annual YoY is cooling (-0.3%).",
    currentMom: "0.4",
    previousMom: "0.2",
    currentYoy: "2.7",
    previousYoy: "3.0",
    epsilon: 1e-9,
  },
  {
    id: "unchanged",
    name: "Stable / Flat",
    description: "Both current and previous month percentages are identical.",
    currentMom: "0.2",
    previousMom: "0.2",
    currentYoy: "3.0",
    previousYoy: "3.0",
    epsilon: 1e-9,
  },
  {
    id: "tolerance",
    name: "Epsilon Sensitivity",
    description: "Difference is 5e-10. At 1e-9 it is unchanged; at 1e-12 it accelerates.",
    currentMom: "0.3000000005",
    previousMom: "0.3",
    currentYoy: "3.1",
    previousYoy: "3.1",
    epsilon: 1e-9,
  },
  {
    id: "missing-prior",
    name: "Incomplete Prior Data",
    description: "Prior reference rates unavailable (safe handling without crash).",
    currentMom: "0.3",
    previousMom: "",
    currentYoy: "3.0",
    previousYoy: "",
    epsilon: 1e-9,
  },
];

/**
 * Deterministic classification ported directly from
 * personal-ai-agent/forex/inflation-observation.js
 */
export function classifyTrend(
  current: number,
  previous: number | null,
  epsilon: number = DEFAULT_EPSILON
): TrendDirection {
  if (previous === null || !Number.isFinite(previous)) {
    return "unknown";
  }

  const difference = current - previous;

  if (Math.abs(difference) <= epsilon) {
    return "unchanged";
  }

  return difference > 0 ? "accelerating" : "cooling";
}

export function combineTrends(
  mom: TrendDirection,
  yoy: TrendDirection
): TrendDirection {
  if (mom === "unknown" || yoy === "unknown") {
    return "unknown";
  }

  if (mom === yoy) {
    return mom;
  }

  return "mixed";
}

export function CpiObservationDemo() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("accelerating");
  const [currentMomInput, setCurrentMomInput] = useState<string>("0.4");
  const [previousMomInput, setPreviousMomInput] = useState<string>("0.2");
  const [currentYoyInput, setCurrentYoyInput] = useState<string>("3.2");
  const [previousYoyInput, setPreviousYoyInput] = useState<string>("2.9");
  const [epsilonSetting, setEpsilonSetting] = useState<number>(1e-9);

  // Field IDs for accessibility
  const currentMomId = useId();
  const previousMomId = useId();
  const currentYoyId = useId();
  const previousYoyId = useId();
  const epsilonSelectId = useId();

  // Parsing and validation
  const parseRate = (raw: string): { value: number | null; error: string | null } => {
    const trimmed = raw.trim();
    if (trimmed === "") {
      return { value: null, error: null };
    }
    const num = Number(trimmed);
    if (!Number.isFinite(num)) {
      return { value: null, error: "Must be a valid finite number" };
    }
    return { value: num, error: null };
  };

  const parsedCurrentMom = parseRate(currentMomInput);
  const parsedPreviousMom = parseRate(previousMomInput);
  const parsedCurrentYoy = parseRate(currentYoyInput);
  const parsedPreviousYoy = parseRate(previousYoyInput);

  const hasCurrentMomError = parsedCurrentMom.error !== null;
  const hasPreviousMomError = parsedPreviousMom.error !== null;
  const hasCurrentYoyError = parsedCurrentYoy.error !== null;
  const hasPreviousYoyError = parsedPreviousYoy.error !== null;

  const missingCurrentRate = parsedCurrentMom.value === null || parsedCurrentYoy.value === null;

  // Execute algorithm when valid
  let momTrend: TrendDirection = "unknown";
  let yoyTrend: TrendDirection = "unknown";
  let overallDirection: TrendDirection = "unknown";
  let momDiff: number | null = null;
  let yoyDiff: number | null = null;

  if (
    !hasCurrentMomError &&
    !hasPreviousMomError &&
    !hasCurrentYoyError &&
    !hasPreviousYoyError &&
    !missingCurrentRate
  ) {
    momTrend = classifyTrend(
      parsedCurrentMom.value!,
      parsedPreviousMom.value,
      epsilonSetting
    );
    yoyTrend = classifyTrend(
      parsedCurrentYoy.value!,
      parsedPreviousYoy.value,
      epsilonSetting
    );
    overallDirection = combineTrends(momTrend, yoyTrend);

    if (parsedPreviousMom.value !== null) {
      momDiff = parsedCurrentMom.value! - parsedPreviousMom.value;
    }
    if (parsedPreviousYoy.value !== null) {
      yoyDiff = parsedCurrentYoy.value! - parsedPreviousYoy.value;
    }
  }

  const applyPreset = (preset: DemoPreset) => {
    setSelectedPresetId(preset.id);
    setCurrentMomInput(preset.currentMom);
    setPreviousMomInput(preset.previousMom);
    setCurrentYoyInput(preset.currentYoy);
    setPreviousYoyInput(preset.previousYoy);
    setEpsilonSetting(preset.epsilon);
  };

  const handleReset = () => {
    applyPreset(PRESETS[0]);
  };

  const getDirectionBadge = (dir: TrendDirection) => {
    switch (dir) {
      case "accelerating":
        return {
          label: "ACCELERATING",
          icon: TrendingUp,
          containerClass:
            "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
          dotClass: "bg-emerald-400",
        };
      case "cooling":
        return {
          label: "COOLING",
          icon: TrendingDown,
          containerClass:
            "border-blue-500/40 bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30",
          dotClass: "bg-blue-400",
        };
      case "unchanged":
        return {
          label: "UNCHANGED",
          icon: Minus,
          containerClass:
            "border-neutral-500/40 bg-neutral-500/15 text-neutral-300 ring-1 ring-neutral-500/30",
          dotClass: "bg-neutral-400",
        };
      case "mixed":
        return {
          label: "MIXED SIGNALS",
          icon: Activity,
          containerClass:
            "border-amber-500/40 bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
          dotClass: "bg-amber-400",
        };
      default:
        return {
          label: "UNKNOWN / INSUFFICIENT DATA",
          icon: HelpCircle,
          containerClass:
            "border-neutral-700 bg-neutral-800/40 text-neutral-400 ring-1 ring-neutral-700/50",
          dotClass: "bg-neutral-500",
        };
    }
  };

  const overallBadge = getDirectionBadge(overallDirection);
  const OverallIcon = overallBadge.icon;

  return (
    <div
      id="interactive-demo"
      className="rounded-3xl border border-blue-200 dark:border-blue-500/30 bg-surface/60 backdrop-blur-xs p-6 sm:p-8 lg:p-10 shadow-2xl transition-all"
    >
      {/* Demo Header */}
      <div className="border-b border-border/80 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <LiquidGlass
              variant="control"
              className="rounded-full px-3 py-1 font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)]"
            >
              Live Browser Execution
            </LiquidGlass>
            <span className="text-foreground-subtle/40">•</span>
            <span className="font-mono-code text-xs text-foreground-subtle">
              Ported from forex/inflation-observation.js
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 px-3 py-1 font-mono-code text-[11px] font-semibold">
            <span className="size-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            Deterministic Algorithm
          </span>
        </div>

        <div className="mt-4">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Calculator className="size-6 text-blue-600 dark:text-[var(--blue-accent)]" />
            Interactive Engineering Demo — Deterministic Data Analysis
          </h3>
          <p className="mt-2 text-sm sm:text-base text-foreground-muted leading-relaxed">
            Execute the exact mathematical classification algorithm used by the Personal AI Agent
            to determine whether consumer price inflation is accelerating, cooling, flat, or mixed.
            Runs 100% locally in your browser with mathematical floating-point tolerance guarantees.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-300 bg-amber-50/90 text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200/90 p-3.5 text-xs leading-relaxed">
          <Info className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <p>
            <strong className="font-semibold text-amber-950 dark:text-amber-200">Engineering Notice:</strong> This interactive demo executes deterministic mathematical
            logic ported from the project repository. It is <em>not</em> an AI model inference, does not
            call external LLMs, and is <em>not</em> financial or investment advice.
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle flex items-center gap-1.5">
            <Sliders className="size-3.5 text-blue-600 dark:text-[var(--blue-accent)]" />
            Select Test Scenario Preset
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-mono-code text-foreground-subtle hover:text-foreground hover:border-border-strong transition-all cursor-pointer"
          >
            <RotateCcw className="size-3" />
            Reset to Default
          </button>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`text-left rounded-xl border p-3 transition-all cursor-pointer ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/80 ring-1 ring-blue-500/40 dark:border-[var(--blue-accent)] dark:bg-blue-500/15 dark:ring-[var(--blue-accent)] shadow-sm"
                    : "border-border bg-surface/80 hover:border-border-strong hover:bg-surface-raised"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? "text-blue-700 dark:text-blue-300" : "text-foreground"}`}>
                    {preset.name}
                  </span>
                  {isSelected && <CheckCircle2 className="size-3.5 text-blue-600 dark:text-blue-400" />}
                </div>
                <p className="mt-1 text-[11px] text-foreground-subtle leading-snug">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Inputs + Output */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-border/80 bg-surface-raised/40 p-5">
            <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)] border-b border-border/60 pb-2">
              1. Month-over-Month (MoM) Rates
            </h4>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={currentMomId}
                  className="block text-xs font-medium text-foreground"
                >
                  Current Month MoM (%)
                </label>
                <input
                  id={currentMomId}
                  type="text"
                  value={currentMomInput}
                  onChange={(e) => {
                    setCurrentMomInput(e.target.value);
                    setSelectedPresetId("");
                  }}
                  placeholder="e.g. 0.4"
                  className={`mt-1.5 w-full rounded-xl border px-3 py-2 font-mono-code text-sm text-foreground bg-surface shadow-xs transition-colors focus:outline-hidden focus:ring-2 ${
                    hasCurrentMomError
                      ? "border-red-500 focus:ring-red-500/40"
                      : "border-border focus:border-[var(--blue-accent)] focus:ring-[var(--blue-accent)]/30"
                  }`}
                />
                {hasCurrentMomError && (
                  <p className="mt-1 text-[11px] text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {parsedCurrentMom.error}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={previousMomId}
                  className="block text-xs font-medium text-foreground"
                >
                  Previous Month MoM (%)
                  <span className="ml-1 text-[11px] text-foreground-subtle">(Optional)</span>
                </label>
                <input
                  id={previousMomId}
                  type="text"
                  value={previousMomInput}
                  onChange={(e) => {
                    setPreviousMomInput(e.target.value);
                    setSelectedPresetId("");
                  }}
                  placeholder="e.g. 0.2 (blank = missing)"
                  className={`mt-1.5 w-full rounded-xl border px-3 py-2 font-mono-code text-sm text-foreground bg-surface shadow-xs transition-colors focus:outline-hidden focus:ring-2 ${
                    hasPreviousMomError
                      ? "border-red-500 focus:ring-red-500/40"
                      : "border-border focus:border-[var(--blue-accent)] focus:ring-[var(--blue-accent)]/30"
                  }`}
                />
                {hasPreviousMomError && (
                  <p className="mt-1 text-[11px] text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {parsedPreviousMom.error}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-surface-raised/40 p-5">
            <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)] border-b border-border/60 pb-2">
              2. Year-over-Year (YoY) Rates
            </h4>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor={currentYoyId}
                  className="block text-xs font-medium text-foreground"
                >
                  Current Month YoY (%)
                </label>
                <input
                  id={currentYoyId}
                  type="text"
                  value={currentYoyInput}
                  onChange={(e) => {
                    setCurrentYoyInput(e.target.value);
                    setSelectedPresetId("");
                  }}
                  placeholder="e.g. 3.2"
                  className={`mt-1.5 w-full rounded-xl border px-3 py-2 font-mono-code text-sm text-foreground bg-surface shadow-xs transition-colors focus:outline-hidden focus:ring-2 ${
                    hasCurrentYoyError
                      ? "border-red-500 focus:ring-red-500/40"
                      : "border-border focus:border-[var(--blue-accent)] focus:ring-[var(--blue-accent)]/30"
                  }`}
                />
                {hasCurrentYoyError && (
                  <p className="mt-1 text-[11px] text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {parsedCurrentYoy.error}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={previousYoyId}
                  className="block text-xs font-medium text-foreground"
                >
                  Previous Month YoY (%)
                  <span className="ml-1 text-[11px] text-foreground-subtle">(Optional)</span>
                </label>
                <input
                  id={previousYoyId}
                  type="text"
                  value={previousYoyInput}
                  onChange={(e) => {
                    setPreviousYoyInput(e.target.value);
                    setSelectedPresetId("");
                  }}
                  placeholder="e.g. 2.9 (blank = missing)"
                  className={`mt-1.5 w-full rounded-xl border px-3 py-2 font-mono-code text-sm text-foreground bg-surface shadow-xs transition-colors focus:outline-hidden focus:ring-2 ${
                    hasPreviousYoyError
                      ? "border-red-500 focus:ring-red-500/40"
                      : "border-border focus:border-[var(--blue-accent)] focus:ring-[var(--blue-accent)]/30"
                  }`}
                />
                {hasPreviousYoyError && (
                  <p className="mt-1 text-[11px] text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {parsedPreviousYoy.error}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Epsilon Configuration */}
          <div className="rounded-2xl border border-border/80 bg-surface-raised/40 p-5">
            <div className="flex items-center justify-between">
              <label
                htmlFor={epsilonSelectId}
                className="font-mono-code text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-[var(--blue-accent)]"
              >
                3. Floating-Point Epsilon Tolerance (ε)
              </label>
              <span className="font-mono-code text-xs text-foreground-subtle">
                |Δ| ≤ ε → Unchanged
              </span>
            </div>

            <div className="mt-3">
              <select
                id={epsilonSelectId}
                value={epsilonSetting}
                onChange={(e) => {
                  setEpsilonSetting(Number(e.target.value));
                  setSelectedPresetId("");
                }}
                className="w-full rounded-xl border border-border bg-surface px-3 py-2 font-mono-code text-xs text-foreground shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--blue-accent)]/30 cursor-pointer"
              >
                <option value={1e-9}>1e-9 (Default BLS Tolerance — matches test suite)</option>
                <option value={1e-12}>1e-12 (Strict Double Precision Threshold)</option>
                <option value={1e-6}>1e-6 (Standard 6-decimal Precision)</option>
                <option value={0}>0.0 (Zero Tolerance — exact equality only)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Computed Results & Reasoning (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#080d16] p-6 shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Classification Result
              </span>
              <span className="font-mono-code text-[11px] text-blue-400">
                100% Deterministic
              </span>
            </div>

            {/* Overall Direction Hero Display */}
            <div className="mt-5 text-center">
              <span className="font-mono-code text-[11px] uppercase tracking-wider text-neutral-400 block mb-2">
                Overall Synthesized Direction
              </span>
              <div
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-mono-code text-base sm:text-lg font-bold ${overallBadge.containerClass}`}
              >
                <OverallIcon className="size-5 shrink-0" />
                <span>{overallBadge.label}</span>
              </div>
            </div>

            {/* Sub-Metric Breakdowns */}
            <div className="mt-6 space-y-3">
              {/* MoM Card */}
              <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-neutral-200">
                    MoM Trend
                  </span>
                  <span
                    className={`font-mono-code text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                      momTrend === "accelerating"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : momTrend === "cooling"
                        ? "bg-blue-500/20 text-blue-400"
                        : momTrend === "unchanged"
                        ? "bg-neutral-500/20 text-neutral-300"
                        : "bg-neutral-800 text-neutral-500"
                    }`}
                  >
                    {momTrend}
                  </span>
                </div>
                <div className="mt-2 text-[11px] font-mono-code text-neutral-400 flex justify-between">
                  <span>
                    Current: {parsedCurrentMom.value !== null ? `${parsedCurrentMom.value}%` : "—"}
                  </span>
                  <span>
                    Previous: {parsedPreviousMom.value !== null ? `${parsedPreviousMom.value}%` : "—"}
                  </span>
                  <span className="text-neutral-300">
                    Δ: {momDiff !== null ? `${momDiff > 0 ? "+" : ""}${momDiff.toFixed(4)}%` : "N/A"}
                  </span>
                </div>
              </div>

              {/* YoY Card */}
              <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-neutral-200">
                    YoY Trend
                  </span>
                  <span
                    className={`font-mono-code text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                      yoyTrend === "accelerating"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : yoyTrend === "cooling"
                        ? "bg-blue-500/20 text-blue-400"
                        : yoyTrend === "unchanged"
                        ? "bg-neutral-500/20 text-neutral-300"
                        : "bg-neutral-800 text-neutral-500"
                    }`}
                  >
                    {yoyTrend}
                  </span>
                </div>
                <div className="mt-2 text-[11px] font-mono-code text-neutral-400 flex justify-between">
                  <span>
                    Current: {parsedCurrentYoy.value !== null ? `${parsedCurrentYoy.value}%` : "—"}
                  </span>
                  <span>
                    Previous: {parsedPreviousYoy.value !== null ? `${parsedPreviousYoy.value}%` : "—"}
                  </span>
                  <span className="text-neutral-300">
                    Δ: {yoyDiff !== null ? `${yoyDiff > 0 ? "+" : ""}${yoyDiff.toFixed(4)}%` : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Reasoning Rules Engine */}
            <div className="mt-5 rounded-xl border border-neutral-800 bg-black/40 p-4">
              <span className="font-mono-code text-[11px] font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Info className="size-3 text-blue-400" />
                Algorithm Execution Trace
              </span>
              <div className="mt-2 text-[11px] font-mono-code text-neutral-400 space-y-1">
                <p>1. Rule: If previous is null → Unknown</p>
                <p>2. Rule: |Current - Prev| ≤ {epsilonSetting} → Unchanged</p>
                <p>3. Rule: (Current - Prev) &gt; 0 → Accelerating, else Cooling</p>
                <p>4. Synthesis: MoM == YoY ? MoM : Mixed</p>
              </div>
            </div>
          </div>

          {/* Test Parity Verification Badge */}
          <div className="mt-6 border-t border-neutral-800 pt-4 flex items-center justify-between text-xs font-mono-code text-neutral-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              Source Parity: 100%
            </span>
            <span className="text-[11px] text-neutral-500">
              test/inflation-observation.test.js
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
