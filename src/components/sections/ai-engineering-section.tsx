import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AIEngineeringFlow } from "@/components/animations/AIEngineeringFlow";

export function AIEngineeringSection() {
  return (
    <section
      id="ai-engineering"
      aria-labelledby="ai-engineering-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="ai-engineering-heading"
          eyebrow="04 — Interactive Engineering Lab"
          title="Controlled AI-Assisted Engineering Lab"
          description="A realistic human-in-the-loop workflow: AI accelerates initial drafts, while senior engineering ownership enforces mobile architecture, concurrency safety, and automated test harnesses."
        />

        <div className="mt-10 sm:mt-12">
          <AIEngineeringFlow />
        </div>
      </Container>
    </section>
  );
}
