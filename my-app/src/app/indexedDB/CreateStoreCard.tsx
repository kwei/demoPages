"use client"

import { Card } from "@/components/Card"
import dbHandler from "@/utils/indexedDBHandler"
import { useRef } from "react"

export const CreateStoreCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const storeKeyRef = useRef<HTMLInputElement>(null)

    const createObjectStore = () => {
        if (storeNameRef.current && storeKeyRef.current) {
            const storeName = storeNameRef.current.value
            storeNameRef.current.value = ''
            const primaryKey = storeKeyRef.current.value
            storeKeyRef.current.value = ''
            dbHandler.createStore(storeName, primaryKey === '' ? 'id' : primaryKey, primaryKey === '')
        }
    }

    return (
        <Card className="flex-col gap-4 flex-1 shrink-0 basis-[48%]">
            <span className="font-bold text-xl">Create Object Store</span>
            <div className="relative flex flex-col gap-1.25">
                <span className="font-semibold">Store Name</span>
                <input 
                    ref={storeNameRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="storeName" 
                    type="text" 
                    placeholder="ex: my-store-name" 
                />
            </div>
            <div className="relative flex flex-col gap-1.25">
                <span className="font-semibold">Primary Key</span>
                <input 
                    ref={storeKeyRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="primaryKey" 
                    type="text" 
                    placeholder="ex: id" 
                />
            </div>
            <div className="relative flex flex-1 w-full items-end">
                <span 
                    className="w-fit font-semibold whitespace-nowrap rounded-2.5 cursor-pointer px-8 py-2 bg-[var(--btn-bg-blue)]"
                    onClick={createObjectStore}
                >
                    Create
                </span>
            </div>
        </Card>
    )
}