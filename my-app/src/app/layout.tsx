import './globals.css'
import { Inter } from 'next/font/google'
import Provider from "@/app/Provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Demo Page',
  description: 'Using Next.js and React.js to implement a demo page.',
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
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
