'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { Button } from "@/components/Button"

export const SessionTest = () => {
    const { data: session } = useSession()

    if (!session || !session.user) {
        return (
            <>
                <span className='text-xl font-semibold'>Sign in to see your account info.</span>
                <Button variant='contained' color='blue' onClick={() => signIn()}>Sign In</Button>
            </>
        )
    }

    return (
        <>
            <div className='rounded-full w-40 h-40 overflow-hidden text-center text-3xl'>
                {session.user.image ?
                    <Image
                        src={session.user.image ?? ''}
                        alt={session.user.name ?? ''}
                        width={160}
                        height={160}
                        quality={100}
                        priority={true}
                    />
                    :
                    <>{session.user.name ? session.user.name.slice(0, 1) : 'X'}</>
                }

            </div>
            <span className='text-xl font-semibold'>{session.user.name ?? 'Unknown Name'}</span>
            <span className='text-xl font-semibold'>{session.user.email ?? 'Unknown Email'}</span>
            <Button variant='outline' color='red' onClick={() => signOut()}>Sign Out</Button>
        </>
    )
}