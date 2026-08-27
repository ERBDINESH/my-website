import { profile, socialLinks } from "@/data/portfolio";

const professionalProfiles = socialLinks
  .filter(
    (link) =>
      link.external &&
      (link.platform === "LinkedIn" || link.platform === "GitHub"),
  )
  .map((link) => link.href);

const emailLink = socialLinks.find((link) => link.platform === "Email");

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: profile.fullName,
    jobTitle: profile.professionalTitle,
    description: profile.summary,
    image: profile.profileImagePath,
    homeLocation: {
      "@type": "Place",
      name: profile.location,
    },
    sameAs: professionalProfiles,
    ...(emailLink?.href === `mailto:${profile.email}`
      ? { email: profile.email }
      : {}),
  },
};

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function ProfileJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePageJsonLd) }}
    />
  );
}
