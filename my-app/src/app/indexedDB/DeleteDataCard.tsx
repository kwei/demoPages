"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import dbHandler from "@/utils/indexedDBHandler"
import { useRef, useState } from "react"

export const DeleteDataCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const idRef = useRef<HTMLInputElement>(null)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    
    const handleDeleteStore = () => {
        if (storeNameRef.current && idRef.current) {
            setIsDelete(true)
            const storeName = storeNameRef.current.value
            const id = idRef.current.value
            storeNameRef.current.value = ''
            idRef.current.value = ''
            dbHandler.deleteData(storeName, Number(id))
            .finally(() => setIsDelete(false))
        }
    }

    return (
        <Card className="flex-col gap-4 flex-1 shrink-0 basis-[48%]">
            <span className="font-bold text-xl">Delete Data from Object Store</span>
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
                <span className="font-semibold">ID</span>
                <input 
                    ref={idRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="ID" 
                    type="text" 
                    placeholder="ex: 0" 
                />
            </div>
            <div className="relative flex flex-1 w-full items-end">
                <Button onClick={handleDeleteStore} loading={isDelete} color="red">Remove Data</Button>
            </div>
        </Card>
    )
}