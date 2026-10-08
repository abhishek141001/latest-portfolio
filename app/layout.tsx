import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Providers } from "./providers"
import "./globals.css"
import { Metadata } from "next"
import { Analytics } from '@vercel/analytics/react'
import Script from "next/script"
import { ResumeVisitTracker } from "@/components/resume-visit-tracker"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Abhishek Raj',
    template: '%s | Abhishek Raj'
  },
  description: siteConfig.description,
  keywords: ['AI-native engineering', 'AI coding agents', 'context engineering', 'software developer', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Abhishek Raj' }],
  creator: 'Abhishek Raj',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Abhishek Raj',
  },
  twitter: {
    card: 'summary_large_image',
    creator: siteConfig.xHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: siteConfig.name,
                  url: siteConfig.url,
                  description: siteConfig.description,
                },
                {
                  "@type": "Person",
                  name: siteConfig.name,
                  url: siteConfig.url,
                  sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl, "https://x.com/ojhaabhishekraj"],
                  jobTitle: "Software Developer",
                  knowsAbout: ["AI-native engineering", "AI coding agents", "Next.js", "Browser automation"],
                },
              ],
            }),
          }}
        />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <Script defer src="https://www.linked2web.com/embed.js" data-app-id="69404b831a8f8789767fa30a" data-api-url="https://linked2web-2-0-server-817687524421.asia-south2.run.app" data-token-endpoint="https://linked2web-2-0-server-817687524421.asia-south2.run.app/api/public/embed-token/69404b831a8f8789767fa30a" data-token="emb_5091c0cb3b75f15c0cad2559a5857f1b091e4b9af2295d9f6427d6c05e60e284" data-theme="light" data-enable-search="true" data-enable-chat="true" data-enable-form="false"></Script>
{/* <Script defer src="https://www.linked2web.com/embed.js" data-app-id="69404b831a8f8789767fa30a" data-api-url="https://linked2web-2-0-server-817687524421.asia-south2.run.app" data-token-endpoint="https://linked2web-2-0-server-817687524421.asia-south2.run.app/api/websites/69404b831a8f8789767fa30a/embed-token" data-theme="light"></Script> */}
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
        <ResumeVisitTracker />
        <AnalyticsTracker />
      </body>
    </html>
  )
}
