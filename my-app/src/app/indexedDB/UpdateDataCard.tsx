"use client"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import dbHandler from "@/utils/indexedDBHandler"
import { useCallback, useRef, useState } from "react"
import { dataType, fileObjectType } from "./constants"

export const UpdateDataCard = () => {
    const storeNameRef = useRef<HTMLInputElement>(null)
    const dataRef = useRef<HTMLInputElement>(null)
    const idRef = useRef<HTMLInputElement>(null)
    const [hasGetData, setHasGetData] = useState<boolean>(false)
    const [isGet, setIsGet] = useState<boolean>(false)
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [files, setFiles] = useState<fileObjectType[] | null>(null)

    const updateDataToStore = useCallback(() => {
        if (!hasGetData) return false
        if (storeNameRef.current && dataRef.current && idRef.current) {
            setIsUpdate(true)
            const storeName = storeNameRef.current.value
            const data = dataRef.current.value
            const id = idRef.current.value
            dataRef.current.value = ''
            dataRef.current.disabled = false
            idRef.current.value = ''
            storeNameRef.current.value = ''
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
            dbHandler.updateData(storeName, { value: convertedData, id: Number(id), type })
            .finally(() => {
                setHasGetData(false)
                setIsUpdate(false)
            })
        }
    }, [hasGetData, files])

    const getStore = () => {
        if (storeNameRef.current && idRef.current) {
            setIsGet(true)
            const storeName = storeNameRef.current.value
            const id = idRef.current.value
            dbHandler.getData(storeName, Number(id))
            .then((data) => {
                const {value, type} = data as { value: unknown, id: number, type: dataType }
                console.log('get data', value, type)
                let convertedData = ''
                if (type === dataType.object) {
                    try {
                        convertedData = JSON.stringify(value)
                    } catch {
                        convertedData = value as string
                    }
                } else if (type === dataType.file) {
                    const d = value as fileObjectType[]
                    console.log('read file', d)
                    convertedData = d.map(v => v.name).join(', ')
                    setFiles(d)
                } else {
                    convertedData = value as string
                }
                
                if (dataRef.current) {
                    dataRef.current.value = convertedData
                    dataRef.current.disabled = true
                }
            })
            .finally(() => {
                setHasGetData(true)
                setIsGet(false)
                setFiles(null)
            })
        }
    }

    const handleDragenter = (e: React.DragEvent) => e.preventDefault()
    const handleDragover = (e: React.DragEvent) => {
        e.preventDefault()
        if (dataRef.current) dataRef.current.disabled = false
    }
    const handleDragleave = (e: React.DragEvent) => {
        e.preventDefault()
        if (dataRef.current) dataRef.current.disabled = true
    }

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
        if (storeNameRef.current && dataRef.current && idRef.current) {
            storeNameRef.current.value = ''
            dataRef.current.value = ''
            dataRef.current.disabled = false
            idRef.current.value = ''
            setHasGetData(false)
            setIsGet(false)
            setIsUpdate(false)
            setFiles(null)
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
                    {hasGetData ? 
                        <Button onClick={updateDataToStore} loading={isUpdate} color='blue'>Update Data</Button> : 
                        <Button onClick={getStore} loading={isGet} color='blue'>Get Data</Button>
                    }
                    <Button onClick={reset} variant="outline" color="gray">Reset</Button>
                </div>
            </div>
        </Card>
    )
}