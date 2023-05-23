"use client"

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import { getTestInfo, getPageInfo } from "@/utils/apiAdapter";
import { ApiTestResType } from "../api/test/type";
import { ApiPageTitleResType } from "../api/pageTitle/type";
import ApiDoc from "./ApiDoc";

export default function Home() {
    const [pageDesc, setPageDesc] = useState<string>('Loading...')
    const [pageTitle, setPageTitle] = useState<string>('Loading...')

    useEffect(() => {
        getTestInfo()
        .then(res => {
            if (res.status === 200) return res.data
        })
        .then(res => {
            console.log("get test info: ", res)
            if (!res) return
            const data = res as ApiTestResType
            console.log("get test text: ", data.data)
        })

        getPageInfo(123)
        .then(res => {
            if (res.status === 200) return res.data
        })
        .then(res => {
            console.log("get user info with id: ", res)
            if (!res) return
            const data = res as ApiPageTitleResType
            setPageDesc(data.data)
        })

        getPageInfo()
        .then(res => {
            if (res.status === 200) return res.data
        })
        .then(res => {
            console.log("get user info: ", res)
            if (!res) return
            const data = res as ApiPageTitleResType
            setPageTitle(data.data)
        })
    }, [])

    return (
    <>
        <Header title={pageTitle} descList={[pageDesc]} />

        <main className="relative flex w-full h-full flex-row flex-wrap gap-5 p-4 md:p-8 ml:p-12">
            <ApiDoc />
        </main>

        <Footer />
    </>
    )
}