import { Briefcase, Building2, Cpu, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { credibilityItems } from "@/data/portfolio";

export function SnapshotSection() {
  const icons = [
    <Smartphone key="mobile" className="size-4 text-accent" />,
    <Building2 key="bank" className="size-4 text-emerald-600 dark:text-emerald-300" />,
    <Briefcase key="commerce" className="size-4 text-teal-600 dark:text-teal-300" />,
    <Cpu key="hardware" className="size-4 text-accent" />,
  ];

  return (
    <section
      id="snapshot"
      aria-label="Engineering Credibility Snapshot"
      className="relative border-y border-border bg-surface-raised/40 py-8 sm:py-10"
    >
      <Container size="wide">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {credibilityItems.map((item, index) => (
            /* SOLID CONTENT CARD (Content-led, high contrast in both themes) */
            <div
              key={item.category}
              className="solid-content-card group flex flex-col justify-between rounded-2xl p-5 border border-border"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {item.metric}
                  </span>
                  {/* Subtle Liquid Glass icon control */}
                  <LiquidGlass
                    variant="control"
                    className="flex size-7 items-center justify-center rounded-lg"
                  >
                    {icons[index % icons.length]}
                  </LiquidGlass>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-foreground">
                  {item.category}
                </h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-foreground-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
