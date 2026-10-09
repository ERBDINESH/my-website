import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ModernizationFlow } from "@/components/animations/ModernizationFlow";

export function ModernizationSection() {
  return (
    <section
      id="modernization"
      aria-labelledby="modernization-heading"
      className="relative py-14 sm:py-20"
    >
      <Container size="wide">
        <SectionHeading
          id="modernization-heading"
          eyebrow="03 — Codebase Evolution"
          title="Legacy Modernization: UIKit → SwiftUI"
          description="Transforming legacy Objective-C and monolithic UIKit codebases into modern Swift 6 declarative architectures without risking production regressions."
        />

        <div className="mt-10 sm:mt-12">
          <ModernizationFlow />
        </div>
      </Container>
    </section>
  );
}
