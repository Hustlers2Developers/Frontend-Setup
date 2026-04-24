import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: 'Hustlers2Developers | Turn Curiosity into Expertise',
  description: 'A developer community focused on turning hustlers into real engineers through building production-grade systems, sharing knowledge openly, and growing together.',
  keywords: ['developer community', 'learn programming', 'coding bootcamp', 'software engineering', 'DSA', 'system design'],
  authors: [{ name: 'Hustlers2Developers' }],
  openGraph: {
    title: 'Hustlers2Developers | Turn Curiosity into Expertise',
    description: 'A developer community focused on turning hustlers into real engineers through building production-grade systems.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Hustlers2Developers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hustlers2Developers',
    description: 'Turn Curiosity into Expertise',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
