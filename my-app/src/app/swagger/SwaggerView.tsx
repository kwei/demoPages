'use client'

import ApiDoc from "@/app/swagger/ApiDoc";
import React from "react";
import {PageTitle} from "@/components/PageTitle";
import {useFetchPageDesc} from "@/app/swagger/hooks";

const SwaggerView = ({pageTitle = ''}: {pageTitle?: string}) => {
    const { data: pageDesc } = useFetchPageDesc()
    return (
        <>
            <PageTitle title={pageTitle} descList={pageDesc}></PageTitle>
            <ApiDoc url="./assets/swagger/swagger.yaml" />
        </>
    )
}

export default SwaggerView