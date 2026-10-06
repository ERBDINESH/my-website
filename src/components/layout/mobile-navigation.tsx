"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Layers, Menu, MessageSquare, Sparkles, Terminal, X } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { NavigationItem, PersonalProfile } from "@/data/types";

interface MobileNavigationProps {
  items: readonly NavigationItem[];
  resumeUrl?: PersonalProfile["resumeUrl"];
}

export function MobileNavigation({
  items,
  resumeUrl,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <>
      {/* Header menu trigger button */}
      <div className="lg:hidden shrink-0">
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex size-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-border bg-surface-raised/80 text-foreground hover:bg-surface-elevated active:scale-95 transition-all cursor-pointer"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-sheet"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X className="size-4 text-accent" aria-hidden="true" />
          ) : (
            <Menu className="size-4" aria-hidden="true" />
          )}
        </button>

        {/* Liquid Glass Bottom Sheet / Drawer */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-md animate-fadeIn"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeMenu();
            }}
          >
            <div
              id="mobile-navigation-sheet"
              className="liquid-glass-strong relative max-h-[85vh] w-full rounded-t-[32px] border-t border-border p-6 shadow-2xl"
            >
              {/* iOS Sheet Grabber */}
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-foreground/20" />

              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-accent">
                    Navigation
                  </span>
                  <span className="text-foreground-subtle">•</span>
                  <span className="text-xs text-foreground-subtle">Dineshbabu Elumalai</span>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="rounded-lg p-1.5 text-foreground-muted hover:text-foreground"
                  aria-label="Close sheet"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Theme Switcher inside Mobile Sheet */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-surface/60 p-3">
                <span className="text-xs font-medium text-foreground">
                  Appearance
                </span>
                <ThemeToggle size="sm" />
              </div>

              <nav aria-label="Mobile primary navigation" className="mt-4">
                <ul className="grid gap-1.5">
                  {items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-medium text-foreground hover:bg-accent/10 hover:text-accent active:bg-accent/15 transition-all"
                        onClick={closeMenu}
                      >
                        <span>{item.label}</span>
                        <span className="font-mono-code text-xs text-foreground-subtle">
                          #{item.id}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Actions: Discuss Project & Resume */}
                <div className="mt-6 space-y-2.5 border-t border-border pt-4">
                  <ActionLink
                    href="#contact"
                    variant="primary"
                    className="w-full justify-center min-h-11 rounded-xl font-semibold shadow-xs"
                    onClick={closeMenu}
                  >
                    <Sparkles className="mr-2 size-4" />
                    Discuss Project
                  </ActionLink>

                  {resumeUrl ? (
                    <ActionLink
                      href={resumeUrl}
                      variant="secondary"
                      download="Dineshbabu-Elumalai-Resume.pdf"
                      className="w-full justify-center min-h-11 rounded-xl"
                      onClick={closeMenu}
                    >
                      <Download className="mr-2 size-4 text-accent" />
                      Download Resume (PDF)
                    </ActionLink>
                  ) : null}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Floating Bottom iOS Glass Tab Bar (Mobile Only) */}
      <div className="fixed bottom-4 inset-x-0 z-40 px-4 lg:hidden pointer-events-none">
        <div className="mx-auto max-w-sm pointer-events-auto">
          <LiquidGlass
            variant="floating"
            className="flex h-12 items-center justify-around rounded-2xl border border-border shadow-xl backdrop-blur-xl px-2"
          >
            <a
              href="#work"
              className="flex flex-col items-center justify-center px-3 py-1 text-[10px] font-medium text-foreground-muted hover:text-accent transition-colors"
            >
              <Layers className="size-3.5 mb-0.5 text-accent" />
              <span>Work</span>
            </a>
            <a
              href="#capabilities"
              className="flex flex-col items-center justify-center px-3 py-1 text-[10px] font-medium text-foreground-muted hover:text-accent transition-colors"
            >
              <Terminal className="size-3.5 mb-0.5 text-accent" />
              <span>Skills</span>
            </a>
            <a
              href="#workspace"
              className="flex flex-col items-center justify-center px-3 py-1 text-[10px] font-medium text-foreground-muted hover:text-accent transition-colors"
            >
              <Sparkles className="size-3.5 mb-0.5 text-accent" />
              <span>Depth</span>
            </a>
            <a
              href="#contact"
              className="flex flex-col items-center justify-center px-3 py-1 text-[10px] font-medium text-foreground-muted hover:text-accent transition-colors"
            >
              <MessageSquare className="size-3.5 mb-0.5 text-accent" />
              <span>Contact</span>
            </a>
          </LiquidGlass>
        </div>
      </div>
    </>
  );
}
