"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
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
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-surface"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      <div
        id="mobile-navigation"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-border bg-background shadow-soft"
      >
        <Container className="py-4">
          <nav aria-label="Mobile navigation">
            <ul className="grid gap-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="flex min-h-11 items-center rounded-md px-3 text-base font-medium text-muted hover:bg-surface hover:text-primary"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {resumeUrl ? (
              <ActionLink
                href={resumeUrl}
                variant="secondary"
                download="Dineshbabu-Elumalai-Resume.pdf"
                className="mt-3 w-full"
                onClick={closeMenu}
              >
                Download Resume
              </ActionLink>
            ) : null}
          </nav>
        </Container>
      </div>
    </div>
  );
}
