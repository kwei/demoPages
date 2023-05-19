import { indexType } from "@/utils/indexedDBService"

export interface fileObjectType {
    name: string
    type: string
    size: number
    data: Blob
}

export enum dataType {
    string,
    number,
    object,
    file
}

export interface storeScheme {
    value: unknown
    id?: number
    type: dataType
    keys?: indexType[]
}