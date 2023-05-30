import { SessionTest } from "@/app/session/SessionTest"
import {Loading} from "@/components/Loading";
import React, {Suspense} from "react";

export default async function Home() {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-3 m-auto'>
            <Suspense fallback={<Loading className={'m-auto'} />}>
                <SessionTest />
            </Suspense>
        </div>
    )
}