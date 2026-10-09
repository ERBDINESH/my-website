import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { DebuggingFlow } from "@/components/animations/DebuggingFlow";

export function DebuggingSection() {
  return (
    <section
      id="debugging"
      aria-labelledby="debugging-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="debugging-heading"
          eyebrow="04 — Production Reliability"
          title="Production Problem-Solving & Performance"
          description="Disciplined root-cause triage for complex concurrency race conditions, memory retention cycles, and volatile network scenarios."
        />

        <div className="mt-10 sm:mt-12">
          <DebuggingFlow />
        </div>
      </Container>
    </section>
  );
}
