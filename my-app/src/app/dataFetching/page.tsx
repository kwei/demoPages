import { LoadingIcon } from "@/components/LoadingIcon"
import React, {Suspense} from "react"
import ProductList from "@/app/dataFetching/ProductList"
import { PageTitle } from "@/components/PageTitle"
import { ProductDataType } from "@/app/dataFetching/type"
import { ALL_PRODUCT_URL } from "@/app/dataFetching/constants"
import {Saver} from "@/app/dataFetching/Saver";

const PAGE_TITLE = 'Fetch data at server side'
const PAGE_DESC = 'Fetch fake products from ' + ALL_PRODUCT_URL

const getProducts = async () => {
    const res = await fetch(ALL_PRODUCT_URL)
    if (!res.ok) return null
    return await res.json() as ProductDataType[]
}

export default async function Home() {
    const products = await getProducts()
    console.log("Data fetching at server component: ", products)

    if (!products) return null

    return (
        <>
            <PageTitle title={PAGE_TITLE} descList={[PAGE_DESC]}/>
            <Suspense fallback={<LoadingIcon className={'m-auto'}/>}>
                <ProductList products={products} />
            </Suspense>

            <Saver products={products} />
        </>
    )
}