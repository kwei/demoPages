import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Example of IndexedDB',
  description: 'Using Next.js and React.js to implement a demo page for indexedDB.',
  keywords: ['IndexedDB', 'Next.js', 'React.js'],
  openGraph: {
    url: 'https://indexed-db-example.vercel.app/indexedDB',
    siteName: 'Example of IndexedDB',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
    ],
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
