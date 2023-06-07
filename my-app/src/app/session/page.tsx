import { SessionTest } from "@/app/session/SessionTest"
import { LoadingIcon } from "@/components/LoadingIcon"
import React, { Suspense } from "react"

export const metadata = {
    openGraph: {
        title: 'Online Demo of Next-Auth',
        siteName: 'Online Demo Next-Auth Page',
        description: 'Using Next.js and React.js to implement a demo page.',
        url: 'https://kw-demo-page.vercel.app/session',
        images: [
            {
                url: '/assets/images/og.png',
                width: 600,
                height: 600,
            },
        ],
        authors: 'KW',
        locale: 'en-US'
    }
}

export default async function Home() {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-3 m-auto'>
            <Suspense fallback={<LoadingIcon className={'m-auto'} />}>
                <SessionTest />
            </Suspense>
        </div>
    )
}