"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Code2,
  FileCode2,
  Folder,
  FolderOpen,
  LayoutGrid,
  Play,
  Sliders,
  Terminal,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { SectionHeading } from "@/components/ui/section-heading";
import { workspaceTopics } from "@/data/portfolio";

export function WorkspaceSection() {
  const [activeTopicId, setActiveTopicId] = useState<string>("architecture");
  // Open folder state for navigator tree
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    Architecture: true,
    Networking: true,
    Concurrency: true,
    "UI Systems": true,
    Reliability: true,
    Delivery: true,
  });

  const activeTopic =
    workspaceTopics.find((t) => t.id === activeTopicId) ?? workspaceTopics[0];

  function toggleFolder(folder: string) {
    setOpenFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  }

  const codeLines = activeTopic.codeSnippet.trim().split("\n");

  return (
    <section
      id="workspace"
      aria-labelledby="workspace-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="workspace-heading"
          eyebrow="04 — Technical Depth"
          title="Interactive Engineering Workspace"
          description="Explore architectural patterns, concurrency mechanisms, and network safety models implemented across production iOS codebases."
        />

        {/* Xcode-Inspired Development IDE Window */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface-raised shadow-2xl sm:mt-12">
          {/* TOP: IDE-STYLE TOOLBAR (Liquid Glass Chrome) */}
          <LiquidGlass
            variant="strong"
            className="flex h-12 items-center justify-between border-b border-border px-3.5 sm:px-5 select-none"
          >
            {/* Left: macOS Traffic Lights + Scheme Run Control */}
            <div className="flex items-center gap-3">
              {/* Traffic Lights */}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40 shadow-xs" />
                <span className="size-3 rounded-full bg-[#febc2e] border border-[#d89e24]/40 shadow-xs" />
                <span className="size-3 rounded-full bg-[#28c840] border border-[#1aab29]/40 shadow-xs" />
              </div>

              {/* Xcode Scheme Selector (Status Chrome) */}
              <div className="hidden sm:flex items-center gap-2 border-l border-border pl-3 text-xs">
                <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-foreground shadow-xs">
                  <Play className="size-3 fill-accent text-accent" />
                  <span className="font-mono-code text-xs font-semibold text-foreground">
                    Portfolio
                  </span>
                  <span className="text-foreground-subtle/50">|</span>
                  <span className="font-mono-code text-xs text-foreground-muted">
                    iOS App
                  </span>
                </div>
                <span className="font-mono-code text-xs text-accent font-medium hidden md:inline">
                  Ready
                </span>
              </div>
            </div>

            {/* Center: Current Active File Breadcrumb */}
            <div className="flex items-center gap-1.5 font-mono-code text-xs text-foreground">
              <span className="text-foreground-subtle hidden md:inline">EngineeringWorkspace</span>
              <span className="text-foreground-subtle/40 hidden md:inline">›</span>
              <span className="text-foreground-muted hidden sm:inline">{activeTopic.folder}</span>
              <span className="text-foreground-subtle/40 hidden sm:inline">›</span>
              <div className="flex items-center gap-1 font-semibold text-accent">
                <FileCode2 className="size-3.5" />
                <span>{activeTopic.filename}</span>
              </div>
            </div>

            {/* Right: IDE Format Badge & Inspector Toggle Chrome */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono-code text-xs text-foreground-subtle hidden sm:inline">
                Swift • Native iOS
              </span>
              <div
                className="hidden sm:flex items-center gap-1 rounded-lg border border-border bg-surface px-2 py-1 text-foreground-muted shadow-xs"
                title="Xcode Inspector Pane"
              >
                <Sliders className="size-3 text-accent" />
                <span className="font-mono-code text-[11px] font-medium uppercase tracking-wider text-foreground">
                  Inspector
                </span>
              </div>
            </div>
          </LiquidGlass>

          {/* 3-COLUMN XCODE INFORMATION ARCHITECTURE (Navigator, Editor, Inspector) */}
          <div className="flex flex-col lg:flex-row">
            {/* LEFT: PROJECT NAVIGATOR (~22% on desktop) */}
            <nav
              aria-label="Xcode Project Navigator"
              className="liquid-glass-subtle w-full lg:w-64 xl:w-72 shrink-0 border-b border-border p-3 lg:border-b-0 lg:border-r flex flex-col justify-between"
            >
              <div>
                {/* Navigator Header */}
                <div className="flex items-center justify-between px-2 py-1 text-xs font-mono-code uppercase tracking-wider text-foreground-subtle font-semibold border-b border-border pb-2">
                  <div className="flex items-center gap-1.5">
                    <LayoutGrid className="size-3 text-accent" />
                    <span>Project Navigator</span>
                  </div>
                  <span className="text-[11px] text-foreground-subtle/60">Xcode View</span>
                </div>

                {/* Root Project Node */}
                <div className="mt-2.5">
                  <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-foreground font-mono-code">
                    <FolderOpen className="size-3.5 text-accent" />
                    <span>EngineeringWorkspace</span>
                  </div>

                  {/* Project File Tree Hierarchy */}
                  <div className="mt-1 space-y-0.5 pl-2 font-mono-code text-xs">
                    {workspaceTopics.map((topic) => {
                      const isActive = topic.id === activeTopic.id;
                      const isOpen = openFolders[topic.folder] ?? true;

                      return (
                        <div key={topic.id} className="space-y-0.5">
                          {/* Folder Item */}
                          <button
                            type="button"
                            onClick={() => toggleFolder(topic.folder)}
                            className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1 text-left text-foreground-muted hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
                            aria-expanded={isOpen}
                          >
                            {isOpen ? (
                              <ChevronDown className="size-3 text-foreground-subtle/70 shrink-0" />
                            ) : (
                              <ChevronRight className="size-3 text-foreground-subtle/70 shrink-0" />
                            )}
                            <Folder className="size-3 text-emerald-500/80 shrink-0" />
                            <span className="text-xs font-medium text-foreground-subtle">
                              {topic.folder}
                            </span>
                          </button>

                          {/* File Item (Indented) */}
                          {isOpen && (
                            <div className="pl-5">
                              <button
                                type="button"
                                onClick={() => setActiveTopicId(topic.id)}
                                className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left transition-all cursor-pointer ${
                                  isActive
                                    ? "liquid-glass-emerald text-[var(--emerald-action-text)] font-bold shadow-xs border-accent/40"
                                    : "text-foreground-muted hover:text-foreground hover:bg-foreground/5 font-normal"
                                }`}
                                aria-pressed={isActive}
                              >
                                <FileCode2
                                  className={`size-3.5 shrink-0 ${
                                    isActive ? "text-accent" : "text-foreground-subtle"
                                  }`}
                                />
                                <span className="truncate text-xs sm:text-[13px]">{topic.filename}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Factual Architectural Descriptors (No unsupported claims) */}
              <div className="mt-6 hidden lg:block rounded-2xl border border-border bg-surface p-3 text-xs font-mono-code">
                <div className="flex items-center gap-1.5 text-foreground font-semibold border-b border-border pb-1.5">
                  <Terminal className="size-3 text-accent" />
                  <span>ARCHITECTURE</span>
                </div>
                <div className="mt-2 space-y-1.5 text-foreground-muted text-xs">
                  <div>
                    <span className="text-foreground-subtle">Pattern: </span>
                    <span className="text-foreground font-medium">{activeTopic.architecture.pattern}</span>
                  </div>
                  <div>
                    <span className="text-foreground-subtle">Concurrency: </span>
                    <span className="text-foreground font-medium">{activeTopic.architecture.concurrency}</span>
                  </div>
                  <div>
                    <span className="text-foreground-subtle">Ownership: </span>
                    <span className="text-foreground font-medium">{activeTopic.architecture.ownership}</span>
                  </div>
                </div>
              </div>
            </nav>

            {/* CENTER: SWIFT CODE EDITOR (~50% on desktop) */}
            <div className="flex-1 min-w-0 bg-[#080b09] flex flex-col">
              {/* Active Tab Bar */}
              <div className="flex items-center justify-between border-b border-white/8 bg-[#0b0e0c] px-3 sm:px-4 py-1.5 select-none">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-2 rounded-lg bg-[#141b16] px-3 py-1 font-mono-code text-xs text-white border border-white/10 shadow-xs">
                    <FileCode2 className="size-3 text-emerald-400" />
                    <span className="font-semibold">{activeTopic.filename}</span>
                    <span className="text-slate-500 hover:text-white text-xs ml-1">×</span>
                  </div>
                </div>
                <span className="font-mono-code text-xs text-emerald-400/90 font-medium hidden sm:inline">
                  Swift • Native iOS
                </span>
              </div>

              {/* Code Canvas with Line Numbers & Subtle Active Line Gutter */}
              <div className="relative overflow-x-auto p-4 sm:p-5 bg-[#080b09] flex-1 min-h-[380px]">
                <div className="flex font-mono-code text-xs sm:text-[13.5px] leading-relaxed">
                  {/* Line numbers gutter */}
                  <div
                    className="select-none text-right pr-4 text-slate-600 font-mono-code text-xs sm:text-[13.5px] leading-relaxed shrink-0 border-r border-white/10"
                    aria-hidden="true"
                  >
                    {codeLines.map((_, i) => (
                      <div
                        key={i}
                        className={i === 0 ? "text-emerald-400/70 font-bold" : ""}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Swift Code Snippet Column */}
                  <pre className="pl-4 text-slate-200 selection:bg-emerald-500/30 selection:text-white overflow-x-auto w-full">
                    <code>{activeTopic.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* RIGHT: INSPECTOR PANE (~28% on desktop) */}
            <aside
              aria-label="Xcode Inspector"
              className="w-full lg:w-72 xl:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-border bg-surface-raised p-5 sm:p-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Inspector Header */}
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2 font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                    <Sliders className="size-3.5" />
                    <span>INSPECTOR</span>
                  </div>
                  <span className="font-mono-code text-[11px] sm:text-xs text-foreground-subtle">
                    {activeTopic.filename}
                  </span>
                </div>

                {/* Section: Responsibility */}
                <div>
                  <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Responsibility
                  </h4>
                  <p className="mt-2 text-sm sm:text-[14px] leading-relaxed text-foreground-muted">
                    {activeTopic.responsibility}
                  </p>
                </div>

                {/* Section: Engineering Choices */}
                <div>
                  <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Engineering Choices
                  </h4>
                  <ul className="mt-2 space-y-2 text-xs sm:text-[13.5px] leading-relaxed text-foreground-muted">
                    {activeTopic.engineeringChoices.map((choice) => (
                      <li key={choice} className="flex items-start gap-2">
                        <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{choice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section: Architecture */}
                <div className="border-t border-border pt-4">
                  <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Architecture
                  </h4>
                  <div className="mt-2 space-y-1.5 font-mono-code text-xs text-foreground-muted">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground-subtle">Pattern:</span>
                      <span className="text-foreground font-semibold">{activeTopic.architecture.pattern}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground-subtle">Concurrency:</span>
                      <span className="text-foreground">{activeTopic.architecture.concurrency}</span>
                    </div>
                  </div>
                </div>

                {/* Section: Dependencies */}
                <div className="border-t border-border pt-4">
                  <h4 className="font-mono-code text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    Dependencies
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {activeTopic.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono-code text-xs text-foreground"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inspector Footer Status */}
              <div className="mt-6 border-t border-border pt-4 flex items-center justify-between font-mono-code text-xs text-foreground-subtle">
                <span className="flex items-center gap-1.5">
                  <Code2 className="size-3 text-accent" />
                  <span>Module Status</span>
                </span>
                <span className="text-accent font-medium">Ready</span>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
