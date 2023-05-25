import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Link from "next/link";

export const metadata = {
  openGraph: {
      title: 'Online Demo Base Page',
      siteName: 'Online Demo Base Page',
      description: 'Using Next.js and React.js to implement a demo page.',
      url: 'https://indexed-db-example.vercel.app/',
      images: [
      {
          url: '/assets/images/og.png',
          width: 600,
          height: 600,
      },
      ],
      authors: ['KW'],
      locale: 'en-US'
  }
}

const PAGE_TITLE = 'Simple Demo Site'
const PAGE_DESC1 = 'This site has some features about testing techniques.'
const PAGE_DESC2 = 'There is a page about testing indexedDB usage at path "/indexedDB".'
const PAGE_DESC3 = 'There is also a page about testing swagger tools such as swagger-codegen and swagger-ui at path "/swagger".'

export default function Home() {
  return (
    <>
      <Header title={PAGE_TITLE} descList={[PAGE_DESC1, PAGE_DESC2, PAGE_DESC3]} />

      <main className="relative flex w-full h-full flex-row flex-wrap gap-5 p-4 md:p-8 ml:p-12">

        <Link 
          className="p-4 cursor-pointer select-none border border-solid border-[var(--border-rgb)] rounded-5 font-bold text-xl" 
          href='./indexedDB'
        >
          Demo IndexedDB
        </Link>

        <Link 
          className="p-4 cursor-pointer select-none border border-solid border-[var(--border-rgb)] rounded-5 font-bold text-xl" 
          href='./swagger'
        >
          Demo Swagger
        </Link>
        
      </main>

      <Footer />
    </>
  )
}
