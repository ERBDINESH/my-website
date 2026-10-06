import type { AnchorHTMLAttributes } from "react";

export type ActionLinkVariant = "primary" | "secondary" | "subtle" | "text";

export interface ActionLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> {
  href: string;
  variant?: ActionLinkVariant;
  className?: string;
}

const variantClasses: Record<ActionLinkVariant, string> = {
  // Emerald Liquid Glass control: translucent emerald tint, thin top highlight, subtle optical depth
  primary:
    "liquid-glass-emerald rounded-xl px-5 py-2.5 text-sm font-semibold text-[var(--emerald-action-text)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-xs",
  // Neutral Liquid Glass control: translucent material, thin border, inner highlight, soft shadow
  secondary:
    "liquid-glass-control rounded-xl px-5 py-2.5 text-sm font-medium text-foreground hover:border-border-strong transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  // Subtle glass pill for low-emphasis triggers
  subtle:
    "liquid-glass-subtle rounded-lg px-3 py-1.5 text-xs font-medium text-foreground-muted hover:text-accent transition-colors",
  // Understated text link
  text:
    "text-sm font-medium text-accent hover:text-accent-hover underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors",
};

export function ActionLink({
  href,
  variant = "primary",
  className,
  target,
  rel,
  children,
  ...props
}: ActionLinkProps) {
  const isExternal = href.startsWith("https://") || href.startsWith("http://");
  const safeTarget = target ?? (isExternal ? "_blank" : undefined);
  const opensInNewTab = safeTarget === "_blank";

  return (
    <a
      href={href}
      target={safeTarget}
      rel={opensInNewTab ? "noopener noreferrer" : rel}
      className={[
        "inline-flex min-h-10 items-center justify-center transition-all motion-reduce:transition-none cursor-pointer",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      {opensInNewTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
