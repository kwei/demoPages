'use client'

import React from "react"
import dynamic from "next/dynamic"
import { LoadingIcon } from "@/components/LoadingIcon"

const CreateStoreCard = dynamic(() => import("@/app/indexedDB/CreateStoreCard"), {
    loading: () => <LoadingIcon className={'m-auto'} />
})
const UpdateDataCard = dynamic(() => import("@/app/indexedDB/UpdateDataCard"), {
    loading: () => <LoadingIcon className={'m-auto'} />
})
const AddDataCard = dynamic(() => import("@/app/indexedDB/AddDataCard"), {
    loading: () => <LoadingIcon className={'m-auto'} />
})
const DeleteDataCard = dynamic(() => import("@/app/indexedDB/DeleteDataCard"), {
    loading: () => <LoadingIcon className={'m-auto'} />
})
const DeleteStoreCard = dynamic(() => import("@/app/indexedDB/DeleteStoreCard"), {
    loading: () => <LoadingIcon className={'m-auto'} />
})
const ActionCard = dynamic(() => import("@/app/indexedDB/ActionCard"), {
    loading: () => <LoadingIcon className={'m-auto'} />
})


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