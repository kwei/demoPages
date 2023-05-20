"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Toast, ToastRefType } from "@/components/Toast"
import dbHandler from "@/utils/indexedDBHandler"
import { useRef, useState } from "react"

export const CreateStoreCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const storeKeyRef = useRef<HTMLInputElement>(null)
    const keyRef = useRef<HTMLInputElement>(null)
    const [editKey, setEditKey] = useState<boolean>(false)
    const [isCreate, setIsCreate] = useState<boolean>(false)
    const toastRef = useRef<ToastRefType>(null)
    const [toastTitle, setToastTitle] = useState<string>('')
    const [toastDesc, setToastDesc] = useState<string>('')
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success')

    const createObjectStore = () => {
        if (storeNameRef.current && storeKeyRef.current && keyRef.current) {
            setIsCreate(true)
            const storeName = storeNameRef.current.value
            storeNameRef.current.value = ''
            const primaryKey = storeKeyRef.current.value
            storeKeyRef.current.value = ''
            const customKeys = keyRef.current.value
            keyRef.current.value = ''

            if (storeName === '') {
                setToastTitle('Create Store')
                setToastDesc('Please enter store name.')
                setToastType('error')
                if (toastRef.current) toastRef.current.trigger()
                setIsCreate(false)
            } else {
                dbHandler.createStore({
                    name: storeName, 
                    primaryKey: primaryKey === '' ? 'id' : primaryKey, 
                    autoIncrement: primaryKey === '',
                    indexes: customKeys !== '' ? customKeys.split(',').map(key => ({ name: key, key })) : undefined
                })
                .then(() => {
                    setToastTitle('Create Store')
                    setToastDesc('Success')
                    setToastType('success')
                    if (toastRef.current) toastRef.current.trigger()
                })
                .catch((msg: string) => {
                    setToastTitle('Create Store')
                    setToastDesc(msg)
                    setToastType('error')
                    if (toastRef.current) toastRef.current.trigger()
                })
                .finally(() => setIsCreate(false))
            }
        }
    }

    const triggerAbleInputKey = () => setEditKey(prevState => !prevState)

    return (
        <Card className="flex-col gap-4 flex-1 shrink-0 basis-[48%]">
            <div className="relative flex flex-col gap-1.25">
                <span className="font-bold text-xl">Create Object Store</span>
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
                <div className="relative flex flex-col gap-0.25">
                    <span className="relative flex items-center font-semibold gap-1.25">
                        Primary Key
                        <span className="select-none cursor-pointer px-2 border border-[var(--border-rgb)]" onClick={triggerAbleInputKey}>
                            {editKey ? 'close' : 'open'}
                        </span>
                    </span>
                    <span className="font-normal text-xs">Default primary key is 'id'.</span>
                </div>
                <input 
                    ref={storeKeyRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="primaryKey" 
                    type="text" 
                    placeholder="ex: id" 
                    disabled={!editKey}
                />
            </div>
            <div className="relative flex flex-col gap-1.25">
                <div className="relative flex flex-col gap-0.25">
                    <span className="font-semibold">KEYs</span>
                    <span className="font-normal text-xs">The key will auto collect and sort the data by the key property. (must unique)</span>
                    <span className="font-normal text-xs">You can set one custom key or multiple keys by 'key1,key2,...,keyn'.</span>
                </div>
                <input 
                    ref={keyRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="KEY" 
                    type="text" 
                    placeholder="ex: name" 
                />
            </div>
            <div className="relative flex flex-1 w-full items-end">
                <Button onClick={createObjectStore} loading={isCreate} color="blue">Create Store</Button>
            </div>
            <Toast ref={toastRef} title={toastTitle} desc={toastDesc} type={toastType} />
        </Card>
    )
}