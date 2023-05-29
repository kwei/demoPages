"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Toast, ToastRefType } from "@/components/Toast"
import dbHandler from "@/utils/indexedDBHandler"
import { useRef, useState } from "react"

const DeleteStoreCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const toastRef = useRef<ToastRefType>(null)
    const [toastTitle, setToastTitle] = useState<string>('')
    const [toastDesc, setToastDesc] = useState<string>('')
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success')

    const removeObjectStore = () => {
        if (storeNameRef.current) {
            setIsDelete(true)
            const storeName = storeNameRef.current.value
            storeNameRef.current.value = ''

            if (storeName === '') {
                setToastTitle('Delete Store')
                setToastDesc('Please enter store name.')
                setToastType('error')
                if (toastRef.current) toastRef.current.trigger()
                setIsDelete(false)
            } else {
                dbHandler.removeStore(storeName)
                .then(() => {
                    setToastTitle('Delete Store')
                    setToastDesc('Success')
                    setToastType('success')
                    if (toastRef.current) toastRef.current.trigger()
                })
                .catch((msg: string) => {
                    setToastTitle('Delete Store')
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
            <span className="font-bold text-xl">Delete Object Store</span>
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
            <div className="relative flex flex-1 w-full items-end">
                <Button onClick={removeObjectStore} loading={isDelete} color="red">Remove Store</Button>
            </div>
            <Toast ref={toastRef} title={toastTitle} desc={toastDesc} type={toastType} />
        </Card>
    )
}

export default DeleteStoreCard