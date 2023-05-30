import { Loading } from "@/components/Loading"
import React, { Suspense } from "react"
import SwaggerView from "@/app/swagger/SwaggerView"
import { getPageTitle } from "@/app/api/pageTitle/getPageTitle"

export default async function Home() {
    const pageTitle = await getPageTitle().json()
    console.log("Get data directly from the server: ", pageTitle)

    return (
        <>
            <Suspense fallback={<Loading className={'m-auto'}/>}>
                <SwaggerView pageTitle={pageTitle.data} />
            </Suspense>
        </>
    )
}