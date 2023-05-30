import './globals.css'
import { Inter } from 'next/font/google'
import Provider from "@/app/Provider";
import {HomeLink} from "@/components/HomeLink";
import {Footer} from "@/components/Footer";

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
          <HomeLink />
            <main className="relative flex flex-col w-full h-full min-h-[800px] p-4 md:p-8 ml:p-12">
              {children}
            </main>
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
