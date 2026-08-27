import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { navigation, profile } from "@/data/portfolio";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 shadow-sm backdrop-blur">
      <Container className="flex min-h-[var(--header-height)] items-center justify-between gap-4">
        <a
          href="#home"
          className="inline-flex min-h-11 items-center text-sm font-bold tracking-tight text-foreground hover:text-primary sm:text-base"
          aria-label={`${profile.fullName} - Home`}
        >
          <span className="truncate sm:hidden">DE</span>
          <span className="hidden sm:inline">{profile.fullName}</span>
        </a>

        <div className="hidden items-center gap-3 lg:flex">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted hover:bg-surface hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {profile.resumeUrl ? (
            <ActionLink
              href={profile.resumeUrl}
              variant="secondary"
              download="Dineshbabu-Elumalai-Resume.pdf"
            >
              Download Resume
            </ActionLink>
          ) : null}
        </div>

        <MobileNavigation items={navigation} resumeUrl={profile.resumeUrl} />
      </Container>
    </header>
  );
}
