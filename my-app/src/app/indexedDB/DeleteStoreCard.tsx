"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import dbHandler from "@/utils/indexedDBHandler"
import { useRef, useState } from "react"

export const DeleteStoreCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const storeKeyRef = useRef<HTMLInputElement>(null)
    const [editKey, setEditKey] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)

    const removeObjectStore = () => {
        if (storeNameRef.current && storeKeyRef.current) {
            setIsDelete(true)
            const storeName = storeNameRef.current.value
            storeNameRef.current.value = ''
            const primaryKey = storeKeyRef.current.value
            storeKeyRef.current.value = ''
            dbHandler.removeStore(storeName, primaryKey === '' ? 'id' : primaryKey, primaryKey === '')
            .finally(() => setIsDelete(false))
        }
    }

    const triggerAbleInputKey = () => setEditKey(prevState => !prevState)
    
    return (
        <Card className="flex-col gap-4 flex-1 shrink-0 basis-[48%]">
            <div className="relative flex flex-col gap-1.25">
                <span className="font-bold text-xl">Delete Object Store</span>
                <span className="font-normal text-sm">Default primary key is "id".</span>
            </div>
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
                <span className="relative flex items-center font-semibold gap-1.25">
                    Primary Key
                    <span className="select-none cursor-pointer px-2 border border-[var(--border-rgb)]" onClick={triggerAbleInputKey}>
                        {editKey ? 'close' : 'open'}
                    </span>
                </span>
                <input 
                    ref={storeKeyRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="primaryKey" 
                    type="text" 
                    placeholder="ex: id" 
                    disabled={!editKey}
                />
            </div>
            <div className="relative flex flex-1 w-full items-end">
                <Button onClick={removeObjectStore} loading={isDelete} color="red">Remove Store</Button>
            </div>
        </Card>
    )
}