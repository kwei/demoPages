import React from "react"
import { PageTitle } from "@/components/PageTitle"
import Collections from "@/app/indexedDB/Collections";

const PAGE_TITLE = 'Simple Test for IndexedDB'
const PAGE_DESC1 = 'First, you need to create a DB, then you can create a store. After that, you can add data or delete the store. Of course, you can also delete the DB. The data that has been added can also be updated and deleted.'
const PAGE_DESC2 = 'Press F12 and select Application tab to observe the data in the IndexedDB in the Storage section.'

export default function Home() {
  return (
    <>
        <PageTitle title={PAGE_TITLE} descList={[PAGE_DESC1, PAGE_DESC2]} />
        <Collections />
    </>
  )
}