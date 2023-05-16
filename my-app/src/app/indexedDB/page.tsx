import { ActionCard } from "./ActionCard"
import { AddDataCard } from "./AddDataCard"
import { CreateStoreCard } from "./CreateStoreCard"
import { DeleteStoreCard } from "./DeleteStoreCard"
import { UpdateDataCard } from "./UpdateDataCard"

export default function Home() {
    
    return (
      <main className="relative flex w-full h-full flex-row flex-wrap gap-5 p-4 md:p-8 ml:p-12">
        <h1 className="w-full text-2xl text-bold">Simple Test for IndexedDB</h1>
        <CreateStoreCard />
        <AddDataCard />
        <UpdateDataCard />
        <DeleteStoreCard />
        <ActionCard />
      </main>
    )
  }