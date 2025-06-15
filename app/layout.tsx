import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Providers } from "./providers"
import "./globals.css"
import { Metadata } from "next"

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
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}