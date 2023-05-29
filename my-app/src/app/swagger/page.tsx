"use client"

import { Header } from "@/components/Header"
import ApiDoc from "./ApiDoc"
import { useFetchPageDesc, useFetchPageTitle } from "@/app/swagger/hooks"

export default function Home() {
    const { data: pageTitle } = useFetchPageTitle()
    const { data: pageDesc } = useFetchPageDesc()

    return (
    <>
        <Header title={pageTitle} descList={pageDesc}></Header>

        <main className="relative flex w-full h-full flex-row flex-wrap gap-5 p-4 md:p-8 ml:p-12">
            <ApiDoc url="./assets/swagger/swagger.yaml" />
        </main>
    </>
    )
}