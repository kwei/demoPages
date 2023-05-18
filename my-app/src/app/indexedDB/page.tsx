import { ActionCard } from "./ActionCard"
import { AddDataCard } from "./AddDataCard"
import { CreateStoreCard } from "./CreateStoreCard"
import { DeleteDataCard } from "./DeleteDataCard"
import { DeleteStoreCard } from "./DeleteStoreCard"
import { UpdateDataCard } from "./UpdateDataCard"

export const metadata = {
  openGraph: {
    title: 'Example of IndexedDB',
    siteName: 'Example of IndexedDB',
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
      <main className="relative flex w-full h-full flex-row flex-wrap gap-5 p-4 md:p-8 ml:p-12">
        <h1 className="w-full text-2xl font-bold">Simple Test for IndexedDB</h1>
        <CreateStoreCard />
        <DeleteStoreCard />
        <AddDataCard />
        <UpdateDataCard />
        <DeleteDataCard />
        <ActionCard />
      </main>
    )
  }