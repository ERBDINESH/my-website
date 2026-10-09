import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { profile } from "@/data/portfolio";
import "./globals.css";

const siteName = `${profile.fullName} | ${profile.professionalTitle}`;
const title = `${profile.fullName} – ${profile.professionalTitle}`;
const description = `Portfolio of ${profile.fullName}, a senior native iOS software engineer with ${profile.experiencePositioning} across banking, commerce, and connected-device products.`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090c0b" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7f6" },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://erbdinesh.com"),
  title,
  description,
  keywords: [
    "Dineshbabu Elumalai",
    "Software Engineer – iOS",
    "Senior iOS Engineer",
    "Mobile Software Engineer",
    "Swift Developer",
    "SwiftUI Developer",
    "UIKit",
    "iOS Architecture",
    "iOS Technical Consulting",
  ],
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
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Pre-hydration theme initialization script: guarantees Dark default and prevents visual flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=(t==='light'?'light':'dark');}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/25 selection:text-foreground"
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-100 -translate-y-24 rounded-xl border border-accent/40 bg-accent px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-transform focus:translate-y-0 motion-reduce:transition-none"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
