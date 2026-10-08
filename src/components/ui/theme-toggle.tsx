"use client";

import { Moon, Sun } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useTheme } from "@/components/theme/theme-provider";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default";
}

export function ThemeToggle({ className, size = "default" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <LiquidGlass
      variant="control"
      role="radiogroup"
      aria-label="Theme preference"
      className={[
        "inline-flex items-center rounded-xl p-0.5 shadow-sm border",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Light Option */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === "light"}
        tabIndex={0}
        onClick={() => setTheme("light")}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            setTheme("dark");
          }
        }}
        className={`flex items-center gap-1.5 rounded-lg font-mono-code font-medium transition-all duration-200 cursor-pointer ${
          size === "sm" ? "px-2 py-1 text-[11px]" : "px-2.5 py-1 text-xs"
        } ${
          theme === "light"
            ? "bg-white text-accent shadow-sm border border-black/5 font-semibold"
            : "text-foreground-muted hover:text-foreground"
        }`}
        aria-label="Switch to Light theme"
      >
        <Sun className="size-3 text-amber-500 shrink-0" aria-hidden="true" />
        <span>Light</span>
      </button>

      {/* Dark Option */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === "dark"}
        tabIndex={0}
        onClick={() => setTheme("dark")}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            setTheme("light");
          }
        }}
        className={`flex items-center gap-1.5 rounded-lg font-mono-code font-medium transition-all duration-200 cursor-pointer ${
          size === "sm" ? "px-2 py-1 text-[11px]" : "px-2.5 py-1 text-xs"
        } ${
          theme === "dark"
            ? "bg-accent/20 text-accent border border-accent/40 shadow-sm font-semibold"
            : "text-foreground-muted hover:text-foreground"
        }`}
        aria-label="Switch to Dark theme"
      >
        <Moon className="size-3 text-accent shrink-0" aria-hidden="true" />
        <span>Dark</span>
      </button>
    </LiquidGlass>
  );
}
