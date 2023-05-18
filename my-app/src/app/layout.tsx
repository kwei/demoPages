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
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <footer className='relative flex flex-col gap-4 p-8 bg-[#191919FF] text-[#F3F3F3FF]'>
        <span>Copyright &copy; 2023 KW Yeh</span>
        <div className='relative flex items-center gap-4'>
          <a 
            className='underline text-sm' 
            href='https://github.com/kwei/indexedDBExample' 
            target="_blank" 
            rel="noreferrer noopener"
          >View Source</a>
        </div>
      </footer>
    </html>
  )
}
