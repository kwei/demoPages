'use client'

import { ProductDataType } from "@/app/dataFetching/type"
import { useEffect } from "react"
import dbHandler from "@/utils/indexedDBHandler"
import { dataType } from "@/app/indexedDB/constants"

export const Saver = ({products}: {products: ProductDataType[]}) => {

    useEffect(() => {
        dbHandler.createDB().then(async () => {
            await dbHandler.createStore({
                autoIncrement: true, name: "products", primaryKey: "id"
            })
            dbHandler.getData('products', 1).then((data) => {
                console.log("getData first: ", !!data)
                if (!data) {
                    console.log('No data existed. Add new one.')
                    dbHandler.addData('products', {
                        type: dataType.object, value: products
                    }).then()
                } else {
                    console.log('Data existed. Update the old one.')
                    dbHandler.updateData('products', {
                        id: 1, type: dataType.object, value: products
                    }).then()
                }
            })
        })
    }, [products])

    return <></>
}