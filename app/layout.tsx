import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Providers } from "./providers"
import "./globals.css"
import { Metadata } from "next"
import { Analytics } from '@vercel/analytics/react'
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://abhishekraj.dev'),
  title: {
    default: 'Abhishek Raj',
    template: '%s | Abhishek Raj'
  },
  description: 'Full stack developer passionate about building scalable products and solving business problems. Currently working at RegisterKaro, based in Gurgaon.',
  keywords: ['Full Stack Developer', 'Web Development', 'React', 'Next.js', 'TypeScript', 'Node.js'],
  authors: [{ name: 'Abhishek Raj' }],
  creator: 'Abhishek Raj',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abhishekraj.dev',
    siteName: 'Abhishek Raj',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ojhaabhishekraj',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
          <Script defer src="https://www.linked2web.com/embed.js" data-app-id="69404b831a8f8789767fa30a" data-api-url="https://linked2web-2-0-server-817687524421.asia-south2.run.app" data-token-endpoint="https://linked2web-2-0-server-817687524421.asia-south2.run.app/api/websites/69404b831a8f8789767fa30a/embed-token" data-theme="light"></Script>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
