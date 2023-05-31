import { LoadingIcon } from "@/components/LoadingIcon"
import React, { Suspense } from "react"
import SwaggerView from "@/app/swagger/SwaggerView"
import { getPageTitle } from "@/app/api/pageTitle/getPageTitle"

export const metadata = {
    openGraph: {
        title: 'Online Demo Base Page',
        siteName: 'Online Demo Swagger Page',
        description: 'Using Next.js and React.js to implement a demo page.',
        url: 'https://kw-demo-page.vercel.app/swagger',
        images: [
            {
                url: '/assets/images/og.png',
                width: 600,
                height: 600,
            },
        ],
        authors: [{ name: 'KW', url: 'kaiweiyeh2018@gmail.com' }],
        locale: 'en-US'
    }
}

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