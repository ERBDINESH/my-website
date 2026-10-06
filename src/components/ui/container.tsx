import type { ComponentPropsWithoutRef } from "react";

export type ContainerSize = "default" | "wide" | "narrow";

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  size?: ContainerSize;
}

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-6xl",
  wide: "max-w-7xl", // ~1280px on desktop
  narrow: "max-w-4xl",
};

export function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
