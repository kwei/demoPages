'use client'

import {SessionTest} from "@/app/SessionTest";
import {useRouter} from "next/navigation";
import {HomeLink} from "@/components/HomeLink";

export default async function Home()
{
    const router = useRouter()

    return (
        <>
            <HomeLink router={router} />
            <SessionTest />
        </>
    )
}