type HeadingLevel = 2 | 3 | 4;

export interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: string;
  level?: HeadingLevel;
  id?: string;
  className?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  level = 2,
  id,
  className,
}: SectionHeadingProps) {
  const HeadingTag = `h${level}` as "h2" | "h3" | "h4";

  return (
    <div className={["max-w-3xl", className].filter(Boolean).join(" ")}>
      {eyebrow ? (
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag
        id={id}
        className="text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl"
      >
        {title}
      </HeadingTag>
      {description ? (
        <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
