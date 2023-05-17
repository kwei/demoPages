"use client"

import { Card } from "@/components/Card"
import dbHandler from "@/utils/indexedDBHandler"
import { useCallback, useRef, useState } from "react"

export const UpdateDataCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const dataRef = useRef<HTMLInputElement>(null)
    const idRef = useRef<HTMLInputElement>(null)
    const [hasGetData, setHasGetData] = useState<boolean>(false)

    const addDataToStore = useCallback(() => {
        if (!hasGetData) return false
        if (storeNameRef.current && dataRef.current && idRef.current) {
            const storeName = storeNameRef.current.value
            const data = dataRef.current.value
            const id = idRef.current.value
            dataRef.current.value = ''
            idRef.current.value = ''
            storeNameRef.current.value = ''
            dbHandler.updateData(storeName, { value: data, id: Number(id) })
            .finally(() => setHasGetData(false))
        }
    }, [hasGetData])

    const getStore = () => {
        if (storeNameRef.current && idRef.current) {
            const storeName = storeNameRef.current.value
            const id = idRef.current.value
            dbHandler.getData(storeName, Number(id))
            .then((data) => {
                const {value} = data as { value: string, id: number }
                if (dataRef.current) dataRef.current.value = value
            })
            .finally(() => setHasGetData(true))
        }
    }

    return (
        <Card className="flex-col gap-4 flex-1 shrink-0 basis-[48%]">
            <div className="relative flex flex-col gap-1.25">
                <span className="font-bold text-xl">Update Data in Object Store</span>
                <span className="font-normal text-sm">Get data first and update lately.</span>
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
                <span className="font-semibold">Data</span>
                <input 
                    ref={dataRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="data" 
                    type="text" 
                    placeholder="ex: any text" 
                />
            </div>
            <div className="relative flex flex-col gap-1.25">
                <span className="font-semibold">ID</span>
                <input 
                    ref={idRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="ID" 
                    type="number" 
                    placeholder="ex: 0" 
                />
            </div>
            <div className="relative flex flex-1 w-full items-end flex-wrap">
                <div className="relative flex items-center gap-4">
                    <span 
                        className={`select-none w-fit font-semibold whitespace-nowrap rounded-2.5 cursor-pointer px-8 py-2 ${hasGetData ? 'bg-[var(--btn-bg-blue)]' : 'bg-[var(--btn-bg-gray)]'}`}
                        onClick={addDataToStore}
                    >
                        Update Data
                    </span>
                    <span 
                        className={`select-none w-fit font-semibold whitespace-nowrap rounded-2.5 cursor-pointer px-8 py-2 ${hasGetData ? 'bg-[var(--btn-bg-gray)]' : 'bg-[var(--btn-bg-blue)]'}`}
                        onClick={getStore}
                    >
                        Get Data
                    </span>
                </div>
            </div>
        </Card>
    )
}