import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { profile, socialLinks } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-raised/80 py-10 text-xs text-foreground-subtle transition-colors">
      <Container size="wide" className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <span className="size-2 rounded-full bg-accent" />
            <span>{profile.fullName}</span>
            <span className="text-foreground-subtle/30">•</span>
            <span className="font-mono-code text-foreground-muted">{profile.professionalTitle}</span>
          </div>
          <p className="text-foreground-subtle">
            7+ years building production native iOS applications across banking, commerce and connected devices.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:justify-end">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              {link.platform}
            </a>
          ))}

          <a
            href="#hero"
            className="flex items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-1 text-foreground-muted hover:text-foreground transition-colors cursor-pointer shadow-xs"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="size-3" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
