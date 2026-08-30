import { Code, ExternalLink, Mail, MapPin } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile, socialLinks } from "@/data/portfolio";

export function ConnectSection() {
  const email = socialLinks.find((link) => link.platform === "Email");
  const professionalLinks = socialLinks.filter(
    (link) => link.platform === "LinkedIn" || link.platform === "GitHub",
  );

  return (
    <section
      id="connect"
      aria-labelledby="connect-heading"
      className="bg-foreground py-20 text-white sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)] lg:items-start lg:gap-20">
          <SectionHeading
            id="connect-heading"
            eyebrow="06 — Connect"
            title="Start a professional conversation"
            description="Connect for relevant iOS opportunities, mobile engineering discussions, or professional collaboration."
            className="[&_h2]:text-white [&_p:last-child]:text-slate-300"
          />

          <address className="not-italic">
            <div className="flex items-start gap-3 border-b border-border pb-6">
              <MapPin
                className="mt-0.5 size-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-white">Location</p>
                <p className="mt-1 text-slate-300">{profile.location}</p>
              </div>
            </div>

            <ul className="mt-5 grid gap-2">
              {email ? (
                <li>
                  <ActionLink
                    href={email.href}
                    variant="text"
                    className="max-w-full justify-start break-all text-white decoration-white/40 hover:text-white sm:break-normal"
                  >
                    <Mail className="mr-2 size-4 shrink-0" aria-hidden="true" />
                    {profile.email}
                  </ActionLink>
                </li>
              ) : null}

              {professionalLinks.map((link) => {
                const Icon =
                  link.platform === "LinkedIn" ? ExternalLink : Code;

                return (
                  <li key={link.platform}>
                    <ActionLink
                      href={link.href}
                      variant="text"
                      className="justify-start text-white decoration-white/40 hover:text-white"
                    >
                      <Icon
                        className="mr-2 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {link.label}
                    </ActionLink>
                  </li>
                );
              })}
            </ul>
          </address>
        </div>
      </Container>
    </section>
  );
}
