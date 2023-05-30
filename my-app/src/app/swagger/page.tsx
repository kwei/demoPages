import {Loading} from "@/components/Loading";
import React, {Suspense} from "react";
import SwaggerView from "@/app/swagger/SwaggerView";

export default function Home() {
    return (
    <>
        <Suspense fallback={<Loading className={'m-auto'} />}>
            <SwaggerView />
        </Suspense>
    </>
    )
}