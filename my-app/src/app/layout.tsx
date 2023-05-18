import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Example of IndexedDB',
  description: 'Using Next.js and React.js to implement a demo page for indexedDB.',
  authors: [{ name: 'KW', url: 'kaiweiyeh2018@gmail.com' }],
  creator: 'KW',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  metadataBase: new URL('https://indexed-db-example.vercel.app'),
  openGraph: {
    title: 'Example of IndexedDB',
    siteName: 'Example of IndexedDB',
    description: 'Using Next.js and React.js to implement a demo page for indexedDB.',
    url: 'https://indexed-db-example.vercel.app/indexedDB',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 600,
        height: 600,
      },
    ],
    authors: ['KW'],
    locale: 'en-US',
    type: 'website'
  }
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
