"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import dbHandler from "@/utils/indexedDBHandler"
import { useRef, useState } from "react"


export const AddDataCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const dataRef = useRef<HTMLInputElement>(null)
    const [isAdd, setIsAdd] = useState<boolean>(false)

    const addDataToStore = () => {
        if (storeNameRef.current && dataRef.current) {
            setIsAdd(true)
            const storeName = storeNameRef.current.value
            storeNameRef.current.value = ''
            const data = dataRef.current.value
            dataRef.current.value = ''
            dbHandler.addData(storeName, { value: data })
            .finally(() => setIsAdd(false))
        }
    }

    return (
        <Card className="flex-col gap-4 flex-1 shrink-0 basis-[48%]">
            <span className="font-bold text-xl">Add Data to Object Store</span>
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
                <span className="font-semibold">Data</span>
                <input 
                    ref={dataRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="data" 
                    type="text" 
                    placeholder="ex: any text" 
                />
            </div>
            <div className="relative flex flex-1 w-full items-end">
                <Button onClick={addDataToStore} loading={isAdd} color="blue">Add Data</Button>
            </div>
        </Card>
    )
}