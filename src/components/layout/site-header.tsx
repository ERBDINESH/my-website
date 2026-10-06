"use client";

import { useEffect, useState } from "react";
import { Download, Sparkles } from "lucide-react";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ActionLink } from "@/components/ui/action-link";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navigation, profile } from "@/data/portfolio";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("capabilities");

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = navigation.map((item) => item.id);
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 inset-x-0 z-50 px-2 sm:px-3 lg:px-4 pointer-events-none">
      <div className="mx-auto w-[calc(100%-16px)] sm:w-[calc(100%-24px)] lg:w-[calc(100%-32px)] max-w-[1440px] pointer-events-auto">
        <LiquidGlass
          variant={isScrolled ? "strong" : "floating"}
          className={`flex h-14 items-center justify-between gap-2 xl:gap-3 rounded-2xl px-3 sm:px-4 lg:px-5 transition-all duration-300 ${
            isScrolled
              ? "border-border-strong shadow-xl"
              : "border-border shadow-md"
          }`}
        >
          {/* Left: macOS Traffic Lights + Brand Identity (flex-1 min-w-0 on mobile) */}
          <div className="flex flex-1 md:flex-initial items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="hidden xl:flex items-center gap-1.5 pr-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]/40" />
              <span className="size-2.5 rounded-full bg-[#febc2e] border border-[#d89e24]/40" />
              <span className="size-2.5 rounded-full bg-[#28c840] border border-[#1aab29]/40" />
            </div>

            <a
              href="#hero"
              className="group flex items-center gap-2 text-xs font-semibold tracking-tight text-foreground hover:text-accent transition-colors min-w-0"
              aria-label={`${profile.fullName} - Software Engineer – iOS`}
            >
              <div className="flex size-7 items-center justify-center rounded-lg border border-border bg-surface-raised font-mono-code text-xs font-bold text-accent shadow-xs shrink-0">
                DE
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-[13px] font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors truncate">
                  {profile.fullName}
                </span>
                <span className="font-mono-code text-[10px] text-foreground-subtle truncate hidden sm:block">
                  Senior iOS Engineer
                </span>
              </div>
            </a>
          </div>

          {/* Center: Floating Segmented Control (Single Row, Never Wraps) */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center rounded-xl border border-border bg-surface/50 p-1 shadow-inner backdrop-blur-md shrink-0"
          >
            <ul className="flex items-center gap-0.5 whitespace-nowrap">
              {navigation.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="whitespace-nowrap">
                    <a
                      href={item.href}
                      className={`relative inline-flex min-h-7 items-center rounded-lg px-2 xl:px-2.5 py-1 font-mono-code text-[13px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "liquid-glass-emerald text-[var(--emerald-action-text)] border border-accent/40 shadow-xs font-semibold"
                          : "text-foreground-muted hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Actions (Desktop/Tablet) & Mobile Menu Trigger (Unshrinkable) */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
            {/* Desktop Theme Control: Available on desktop (lg+), inside mobile drawer for <lg */}
            <div className="hidden lg:block">
              <ThemeToggle size="sm" />
            </div>

            {/* Resume: Available on desktop (lg+), inside mobile drawer for <lg */}
            {profile.resumeUrl ? (
              <ActionLink
                href={profile.resumeUrl}
                variant="secondary"
                download="Dineshbabu-Elumalai-Resume.pdf"
                className="hidden lg:inline-flex text-xs py-1.5 px-2.5 xl:px-3 rounded-xl whitespace-nowrap"
              >
                <Download className="mr-1.5 size-3 text-accent" />
                <span>Resume</span>
              </ActionLink>
            ) : null}

            {/* Discuss Project: Available on tablet & desktop (md+), inside mobile drawer for <md */}
            <ActionLink
              href="#contact"
              variant="primary"
              className="hidden md:inline-flex text-xs py-1.5 px-3 xl:px-3.5 rounded-xl font-semibold shadow-xs whitespace-nowrap"
            >
              <Sparkles className="mr-1.5 size-3" />
              <span>Discuss Project</span>
            </ActionLink>

            {/* Mobile Menu Trigger: Visible on <lg, shrink-0, min touch target 44px */}
            <MobileNavigation items={navigation} resumeUrl={profile.resumeUrl} />
          </div>
        </LiquidGlass>
      </div>
    </header>
  );
}
