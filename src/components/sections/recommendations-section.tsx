import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { recommendations } from "@/data/portfolio";
import type { Recommendation } from "@/data/types";

export function RecommendationsSection() {
  const recommendationItems: readonly Recommendation[] = recommendations;

  if (recommendationItems.length === 0) return null;

  return (
    <section
      aria-labelledby="recommendations-heading"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id="recommendations-heading"
          eyebrow="Recommendations"
          title="Professional recommendations"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {recommendationItems.map((recommendation) => (
            <figure
              key={`${recommendation.authorName}-${recommendation.authorRole}`}
              className="border-l-4 border-accent pl-6"
            >
              <blockquote className="text-lg leading-8 text-foreground">
                “{recommendation.text}”
              </blockquote>
              <figcaption className="mt-5">
                <p className="font-semibold text-foreground">
                  {recommendation.authorName}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {recommendation.authorRole}
                </p>
                <ActionLink
                  href={recommendation.linkedInSource}
                  variant="text"
                  className="mt-2"
                >
                  View source on LinkedIn
                </ActionLink>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
