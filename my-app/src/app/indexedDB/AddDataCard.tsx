"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import dbHandler from "@/utils/indexedDBHandler"
import { useCallback, useRef, useState } from "react"
import { dataType, fileObjectType } from "./constants"
import { Toast, ToastRefType } from "@/components/Toast"


export const AddDataCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const dataRef = useRef<HTMLInputElement>(null)
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [files, setFiles] = useState<fileObjectType[] | null>(null)
    const toastRef = useRef<ToastRefType>(null)
    const [toastTitle, setToastTitle] = useState<string>('')
    const [toastDesc, setToastDesc] = useState<string>('')
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success')

    const addDataToStore = useCallback(() => {
        if (storeNameRef.current && dataRef.current) {
            setIsAdd(true)
            const storeName = storeNameRef.current.value
            storeNameRef.current.value = ''
            const data = dataRef.current.value
            dataRef.current.value = ''
            dataRef.current.disabled = false
            let convertedData = null
            let type = dataType.string
            if (files) {
                convertedData = files
                type = dataType.file
            } else {
                try {
                    convertedData = JSON.parse(data)
                    type = dataType.object
                } catch {
                    convertedData = data
                    type = dataType.string
                }
            }
            dbHandler.addData(storeName, { 
                value: convertedData, 
                type 
            })
            .then(() => {
                setToastTitle('Add Data')
                setToastDesc('Success')
                setToastType('success')
                if (toastRef.current) toastRef.current.trigger()
            })
            .catch((msg: string) => {
                setToastTitle('Add Data')
                setToastDesc(msg)
                setToastType('error')
                if (toastRef.current) toastRef.current.trigger()
            })
            .finally(() => {
                setIsAdd(false)
                setFiles(null)
            })
        }
    }, [files])

    const handleDragenter = (e: React.DragEvent) => e.preventDefault()
    const handleDragover = (e: React.DragEvent) => e.preventDefault()
    const handleDragleave = (e: React.DragEvent) => e.preventDefault()

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        const convertedData = []
        for(let i = 0 ; i < files.length ; i++) {
            const file = files[i]
            const blob = new Blob([file], {type: file.type})
            convertedData.push({
                name: file.name,
                type: file.type,
                size: file.size,
                data: blob
            })
        }
        if (dataRef.current) {
            dataRef.current.value = convertedData.map(data => data.name).join(', ')
            dataRef.current.disabled = true
        }
        setFiles(convertedData)
    }

    const reset = () => {
        if (storeNameRef.current && dataRef.current) {
            storeNameRef.current.value = ''
            dataRef.current.value = ''
            dataRef.current.disabled = false
            setIsAdd(false)
            setFiles(null)
        }
    }

    return (
        <Card className="flex-col gap-4 flex-1 shrink-0 basis-[48%]">
            <div className="relative flex flex-col gap-1.25">
                <span className="font-bold text-xl">Add Data to Object Store</span>
                <span className="font-normal text-sm">Add string or JSON formated string.</span>
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
                    <span className="font-semibold">Data</span>
                    <span className="font-normal text-xs">You can also drop files here.</span>
                </div>
                <input 
                    ref={dataRef} 
                    className="p-1.25 rounded-1.25 outline-none text-black" 
                    name="data" 
                    type="text" 
                    placeholder="ex: any text"
                    onDragEnter={handleDragenter}
                    onDragOver={handleDragover}
                    onDragLeave={handleDragleave}
                    onDrop={handleDrop}
                />
            </div>
            <div className="relative flex flex-1 w-full items-end">
                <div className="relative flex items-center gap-4">
                    <Button onClick={addDataToStore} loading={isAdd} color="blue">Add Data</Button>
                    <Button onClick={reset} variant="outline" color="gray">Reset</Button>
                </div>
            </div>
            <Toast ref={toastRef} title={toastTitle} desc={toastDesc} type={toastType} />
        </Card>
    )
}