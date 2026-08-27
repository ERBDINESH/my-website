import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { profile } from "@/data/portfolio";
import "./globals.css";

const siteName = `${profile.fullName} Portfolio`;
const title = `${profile.fullName} | ${profile.professionalTitle}`;
const description = `Portfolio of ${profile.fullName}, a ${profile.professionalTitle} with ${profile.experiencePositioning} building reliable native mobile applications.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://erbdinesh.com"),
  title,
  description,
  alternates: { canonical: "/" },
  applicationName: siteName,
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  openGraph: {
    title,
    description,
    siteName,
    url: "https://erbdinesh.com",
    images: "/og-image.png",
    locale: "en_IN",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title,
    description,
    creator: profile.fullName,
    images: "/og-image.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-100 -translate-y-24 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow-soft transition-transform focus:translate-y-0 motion-reduce:transition-none"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
