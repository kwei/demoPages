'use client'

import ApiDoc from "@/app/swagger/ApiDoc";
import React from "react";
import {PageTitle} from "@/components/PageTitle";
import {useFetchPageDesc, useFetchPageTitle} from "@/app/swagger/hooks";

const SwaggerView = () => {
    const { data: pageTitle } = useFetchPageTitle()
    const { data: pageDesc } = useFetchPageDesc()
    return (
        <>
            <PageTitle title={pageTitle} descList={pageDesc}></PageTitle>
            <ApiDoc url="./assets/swagger/swagger.yaml" />
        </>
    )
}

export default SwaggerView