import React from "react";

export type LiquidGlassVariant =
  | "subtle"
  | "regular"
  | "strong"
  | "floating"
  | "control"
  | "emerald";

export interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LiquidGlassVariant;
  as?: React.ElementType;
  children?: React.ReactNode;
}

const variantClasses: Record<LiquidGlassVariant, string> = {
  subtle: "liquid-glass-subtle",
  regular: "liquid-glass-regular",
  strong: "liquid-glass-strong",
  floating: "liquid-glass-floating",
  control: "liquid-glass-control",
  emerald: "liquid-glass-emerald",
};

export function LiquidGlass({
  variant = "regular",
  as: Component = "div",
  className,
  children,
  ...props
}: LiquidGlassProps) {
  return (
    <Component
      className={[
        "relative transition-all duration-200",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
