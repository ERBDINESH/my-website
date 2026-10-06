"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Set of in-memory listeners to notify all subscribers immediately in the SAME tab
const listeners = new Set<() => void>();

function emitThemeChange() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // Ignore listener error
    }
  });
}

function subscribe(callback: () => void) {
  listeners.add(callback);

  // Cross-tab synchronization via storage event
  const handleStorage = (event: StorageEvent) => {
    if (event.key === "theme" && event.newValue) {
      const newTheme = event.newValue === "light" ? "light" : "dark";
      if (document.documentElement.dataset.theme !== newTheme) {
        document.documentElement.dataset.theme = newTheme;
        emitThemeChange();
      }
    }
  };

  window.addEventListener("storage", handleStorage);

  // MutationObserver for any external changes to data-theme on <html>
  const observer = new MutationObserver(() => {
    callback();
  });

  if (typeof document !== "undefined" && document.documentElement) {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
    observer.disconnect();
  };
}

function getSnapshot(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem("theme", newTheme);
    } catch {
      // localStorage may be unavailable in private browsing
    }
    // Set authoritative data-theme on root HTML
    document.documentElement.dataset.theme = newTheme;
    // Notify all React subscribers in the active tab immediately
    emitThemeChange();
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
