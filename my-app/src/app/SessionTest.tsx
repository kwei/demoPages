'use client'

import {signIn, signOut, useSession} from "next-auth/react";
import {useEffect} from "react";
import {Button} from "@/components/Button";

export const SessionTest = () => {
    const { data: session } = useSession()

    useEffect(() => {
        console.log(session)
    }, [session])

    if (!session) {
        return (
            <div className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
                <span className='text-xl font-semibold'>Sign in to see your account info.</span>
                <Button variant='contained' color='blue' onClick={() => signIn()}>Sign In</Button>
            </div>
        )
    }

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
            <img className='rounded-full overflow-hidden w-30 h-30' alt='' src={session?.user?.image ?? ''} />
            <span className='text-xl font-semibold'>{session?.user?.name}</span>
            <span className='text-xl font-semibold'>{session?.user?.email}</span>
            <Button variant='outline' color='red' onClick={() => signOut()}>Sign Out</Button>
        </div>
    )
}