import type { AnchorHTMLAttributes } from "react";

export type ActionLinkVariant = "primary" | "secondary" | "text";

export interface ActionLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> {
  href: string;
  variant?: ActionLinkVariant;
  className?: string;
}

const variantClasses: Record<ActionLinkVariant, string> = {
  primary:
    "rounded-md bg-primary px-4 py-2.5 text-white shadow-sm hover:bg-primary-hover",
  secondary:
    "rounded-md border border-border bg-background px-4 py-2.5 text-foreground shadow-sm hover:border-primary/40 hover:bg-surface hover:text-primary",
  text: "px-1 text-primary underline decoration-primary/35 hover:decoration-current",
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
        "inline-flex min-h-11 items-center justify-center text-sm font-semibold underline-offset-4 transition-colors motion-reduce:transition-none",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      {opensInNewTab ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  );
}
