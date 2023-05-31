import { LoadingIcon } from "@/components/LoadingIcon"
import React, { Suspense } from "react"
import SwaggerView from "@/app/swagger/SwaggerView"
import { getPageTitle } from "@/app/api/pageTitle/getPageTitle"

export default async function Home() {
    const pageTitle = await getPageTitle().json()
    console.log("Get data directly from the server: ", pageTitle)

    return (
        <>
            <Suspense fallback={<LoadingIcon className={'m-auto'}/>}>
                <SwaggerView pageTitle={pageTitle.data} />
            </Suspense>
        </>
    )
}