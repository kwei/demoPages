"use client"

import { Card } from "@/components/Card"
import { useRef } from "react"
import dbHandler from "@/utils/indexedDBHandler"

export const ActionCard = () => {
    const dbNameRef = useRef<HTMLInputElement>(null)

    const handleDeleteDB = () => {
        if (dbNameRef.current) {
            const dbName = dbNameRef.current.value
            dbNameRef.current.value = ''
            console.log('deleteDB: ', dbName === '' ? undefined : dbName)
            dbHandler.deleteDB(dbName === '' ? undefined : dbName)
        }
    }

    const handleCreateDB = () => {
        if (dbNameRef.current) {
            const dbName = dbNameRef.current.value
            dbNameRef.current.value = ''
            console.log('createDB: ', dbName === '' ? undefined : dbName)
            dbHandler.createDB(dbName === '' ? undefined : dbName)
        }
    }

    return (
        <Card className="flex-col gap-4 flex-1 shrink-0 basis-[48%]">
            <span className="font-bold text-xl">Create or Delete DB</span>
            <div className="relative flex flex-col gap-1.25">
                <span className="font-semibold">DB Name</span>
                <input 
                    ref={dbNameRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="dbName" 
                    type="text" 
                    placeholder="ex: my-app" 
                />
            </div>
            <div className="relative flex flex-1 w-full items-end flex-wrap">
                <div className="relative flex items-center gap-4">
                <span 
                    className="w-fit font-semibold h-fit rounded-2.5 whitespace-nowrap cursor-pointer px-8 py-2 bg-[var(--btn-bg-red)]"
                    onClick={handleDeleteDB}
                >
                    Delete DB
                </span>
                <span 
                    className="w-fit font-semibold h-fit rounded-2.5 whitespace-nowrap cursor-pointer px-8 py-2 bg-[var(--btn-bg-blue)]"
                    onClick={handleCreateDB}
                >
                    Create DB
                </span>
                </div>
            </div>
        </Card>
    )
}