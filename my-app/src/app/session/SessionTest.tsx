'use client'

import {signIn, signOut, useSession} from "next-auth/react"
import Image from "next/image"
import {Button} from "@/components/Button"

export const SessionTest = () => {
    const { data: session } = useSession()

    if (!session || !session.user) {
        return (
            <div className='w-full h-screen flex flex-col items-center justify-center gap-3'>
                <span className='text-xl font-semibold'>Sign in to see your account info.</span>
                <Button variant='contained' color='blue' onClick={() => signIn()}>Sign In</Button>
            </div>
        )
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center gap-3'>
            <div className='rounded-full overflow-hidden w-30 h-30'>
                <Image
                    className="m-auto h-full w-full object-cover"
                    src={session.user.image ?? ''}
                    alt=''
                    width={100}
                    height={100}
                />
            </div>
            <span className='text-xl font-semibold'>{session.user.name}</span>
            <span className='text-xl font-semibold'>{session.user.email}</span>
            <Button variant='outline' color='red' onClick={() => signOut()}>Sign Out</Button>
        </div>
    )
}