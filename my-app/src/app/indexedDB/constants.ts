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