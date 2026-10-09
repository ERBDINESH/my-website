import { Briefcase, Building2, Cpu, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { credibilityItems } from "@/data/portfolio";

export function SnapshotSection() {
  const icons = [
    <Smartphone key="mobile" className="size-3.5 text-accent" />,
    <Building2 key="bank" className="size-3.5 text-accent" />,
    <Briefcase key="commerce" className="size-3.5 text-accent" />,
    <Cpu key="hardware" className="size-3.5 text-accent" />,
  ];

  return (
    <section
      id="snapshot"
      aria-label="Engineering Credibility Snapshot"
      className="relative border-y border-border/70 bg-surface/30 backdrop-blur-xs py-8 sm:py-10"
    >
      <Container size="wide">
        {/* Open Editorial Spec Strip (Replaces generic boxed cards) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border/50">
          {credibilityItems.map((item, index) => (
            <div
              key={item.category}
              className="flex flex-col justify-between px-2 sm:px-4 lg:px-6 transition-all"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                    {icons[index % icons.length]}
                  </span>
                  <span className="font-mono-code text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {item.category}
                  </span>
                </div>

                <div className="mt-3 font-mono-code text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {item.metric}
                </div>
              </div>

              <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-foreground-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
