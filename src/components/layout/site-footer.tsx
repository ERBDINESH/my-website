import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { profile, socialLinks } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-700 bg-foreground text-white">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">{profile.fullName}</p>
          <p className="mt-1 text-sm text-slate-300">
            {profile.professionalTitle} based in {profile.location}.
          </p>
        </div>

        {socialLinks.length > 0 ? (
          <nav aria-label="Social links">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <ActionLink href={link.href} variant="text">
                    {link.label}
                  </ActionLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </footer>
  );
}
