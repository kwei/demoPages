"use client"

import { Card } from "@/components/Card"
import { useRef, useState } from "react"
import dbHandler from "@/utils/indexedDBHandler"
import { Button } from "@/components/Button"
import { Toast, ToastRefType } from "@/components/Toast"

const ActionCard = () => {
    const dbNameRef = useRef<HTMLInputElement>(null)
    const toastRef = useRef<ToastRefType>(null)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isCreate, setIsCreate] = useState<boolean>(false)
    const [toastTitle, setToastTitle] = useState<string>('')
    const [toastDesc, setToastDesc] = useState<string>('')
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success')

    const handleDeleteDB = () => {
        if (dbNameRef.current) {
            setIsDelete(true)
            const dbName = dbNameRef.current.value
            dbNameRef.current.value = ''
            console.log('deleteDB: ', dbName === '' ? undefined : dbName)
            dbHandler.deleteDB(dbName === '' ? undefined : dbName)
            .then(() => {
                setToastTitle('Delete DB')
                setToastDesc('Success')
                setToastType('success')
                if (toastRef.current) toastRef.current.trigger()
            })
            .finally(() => {
                setIsDelete(false)
            })
        }
    }

    const handleCreateDB = () => {
        if (dbNameRef.current) {
            setIsCreate(true)
            const dbName = dbNameRef.current.value
            dbNameRef.current.value = ''
            console.log('createDB: ', dbName === '' ? undefined : dbName)
            dbHandler.createDB(dbName === '' ? undefined : dbName)
            .then(() => {
                setToastTitle('Create DB')
                setToastDesc('Success')
                setToastType('success')
                if (toastRef.current) toastRef.current.trigger()
            })
            .finally(() => {
                setIsCreate(false)
            })
        }
    }

    return (
        <Card className="flex-col gap-4 flex-1 shrink-0 basis-[48%]">
            <div className="relative flex flex-col gap-1.25">
                <span className="font-bold text-xl">Create or Delete DB</span>
                <span className="font-normal text-sm">Default DB name is "my-app".</span>
            </div>
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
                    <Button onClick={handleDeleteDB} loading={isDelete} color="red">Delete DB</Button>
                    <Button onClick={handleCreateDB} loading={isCreate} color="blue">Create DB</Button>
                </div>
            </div>
            <Toast ref={toastRef} title={toastTitle} desc={toastDesc} type={toastType} />
        </Card>
    )
}

export default ActionCard