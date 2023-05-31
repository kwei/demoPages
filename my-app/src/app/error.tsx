'use client' // Error components must be Client Components

import {useEffect} from 'react'
import {Button} from "@/components/Button";

const Error = ({ error, reset }: { error: Error, reset: () => void }) => {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <Button variant='contained' color='red' onClick={() => reset()}>
                Try again
            </Button>
        </div>
    )
}

export default Error