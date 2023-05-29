"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Toast, ToastRefType } from "@/components/Toast"
import dbHandler from "@/utils/indexedDBHandler"
import { useRef, useState } from "react"

const DeleteDataCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const idRef = useRef<HTMLInputElement>(null)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const toastRef = useRef<ToastRefType>(null)
    const [toastTitle, setToastTitle] = useState<string>('')
    const [toastDesc, setToastDesc] = useState<string>('')
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success')
    
    const handleDeleteStore = () => {
        if (storeNameRef.current && idRef.current) {
            setIsDelete(true)
            const storeName = storeNameRef.current.value
            const id = idRef.current.value
            storeNameRef.current.value = ''
            idRef.current.value = ''
            
            if (storeName === '') {
                setToastTitle('Delete Data')
                setToastDesc('Please enter store name.')
                setToastType('error')
                if (toastRef.current) toastRef.current.trigger()
                setIsDelete(false)
            } else {
                dbHandler.deleteData(storeName, Number(id))
                .then(() => {
                    setToastTitle('Delete Data')
                    setToastDesc('Success')
                    setToastType('success')
                    if (toastRef.current) toastRef.current.trigger()
                })
                .catch((msg: string) => {
                    setToastTitle('Delete Data')
                    setToastDesc(msg)
                    setToastType('error')
                    if (toastRef.current) toastRef.current.trigger()
                })
                .finally(() => setIsDelete(false))
            }
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
            <Toast ref={toastRef} title={toastTitle} desc={toastDesc} type={toastType} />
        </Card>
    )
}

export default DeleteDataCard