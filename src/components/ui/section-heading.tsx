type HeadingLevel = 2 | 3 | 4;

export interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: string;
  level?: HeadingLevel;
  id?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  level = 2,
  id,
  className,
  align = "left",
}: SectionHeadingProps) {
  const HeadingTag = `h${level}` as "h2" | "h3" | "h4";
  const isCenter = align === "center";

  return (
    <div
      className={[
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <div className={`mb-3 flex items-center gap-2 ${isCenter ? "justify-center" : "justify-start"}`}>
          <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
          <p className="font-mono-code text-xs font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <HeadingTag
        id={id}
        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]"
      >
        {title}
      </HeadingTag>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
