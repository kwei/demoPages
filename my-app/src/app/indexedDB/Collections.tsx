'use client'

import React from "react"
const CreateStoreCard = React.lazy(() => import("@/app/indexedDB/CreateStoreCard"))
const UpdateDataCard = React.lazy(() => import("@/app/indexedDB/UpdateDataCard"))
const AddDataCard = React.lazy(() => import("@/app/indexedDB/AddDataCard"))
const DeleteDataCard = React.lazy(() => import("@/app/indexedDB/DeleteDataCard"))
const DeleteStoreCard = React.lazy(() => import("@/app/indexedDB/DeleteStoreCard"))
const ActionCard = React.lazy(() => import("@/app/indexedDB/ActionCard"))


const Collections = () => {
    return (
        <div className='flex items-stretch flex-wrap gap-4'>
            <CreateStoreCard />
            <UpdateDataCard />
            <AddDataCard />
            <DeleteDataCard />
            <DeleteStoreCard />
            <ActionCard />
        </div>
    )
}

export default Collections