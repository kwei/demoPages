import { ActionCard } from "./ActionCard"
import { AddDataCard } from "./AddDataCard"
import { CreateStoreCard } from "./CreateStoreCard"
import { DeleteDataCard } from "./DeleteDataCard"
import { DeleteStoreCard } from "./DeleteStoreCard"
import { UpdateDataCard } from "./UpdateDataCard"

export const metadata = {
  openGraph: {
    title: 'Online Demo of IndexedDB',
    siteName: 'Online Demo of IndexedDB',
    description: 'Using Next.js and React.js to implement a demo page for indexedDB.',
    url: 'https://indexed-db-example.vercel.app/indexedDB',
    images: [
      {
        url: '/assets/images/og.png',
        width: 600,
        height: 600,
      },
    ],
    authors: ['KW'],
    locale: 'en-US',
    type: 'website'
  }
}

export default function Home() {
    
    return (
      <>
        <header className="sticky z-10 top-0 bg-[var(--background)] flex flex-col w-full gap-4 p-4 md:p-8 ml:p-12">
          <h1 className="w-full text-2xl font-bold">Simple Test for IndexedDB</h1>
          <p className="relative flex flex-col gap-1.25 text-sm">
            <span>First, you need to create a DB, then you can create a store. After that, you can add data or delete the store. Of course, you can also delete the DB. The data that has been added can also be updated and deleted.</span>
            <span>Press F12 and select Application tab to observe the data in the IndexedDB in the Storage section.</span>
          </p>
        </header>

        <main className="relative flex w-full h-full flex-row flex-wrap gap-5 p-4 md:p-8 ml:p-12">
          <CreateStoreCard />
          <UpdateDataCard />
          <AddDataCard />
          <DeleteDataCard />
          <DeleteStoreCard />
          <ActionCard />
        </main>

        <footer className='relative flex flex-col items-center gap-4 p-8 bg-[#191919FF] text-[#F3F3F3FF]'>
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
      </>
    )
  }