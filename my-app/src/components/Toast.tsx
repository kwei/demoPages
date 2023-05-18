"use client"

import { forwardRef, useImperativeHandle, useMemo, useState } from "react"

interface ToastPropsType {
    title: string
    desc: string
    type: 'success' | 'error' | 'warning'
}

export interface ToastRefType {
    trigger: () => void
}

export const Toast = forwardRef<ToastRefType, ToastPropsType>((props, ref) => {
    const { title, desc, type } = props

    const [startAnimation, setStartAnimation] = useState<boolean>(false)

    const style = useMemo(() => {
        if (type === 'success') return 'border-[var(--success)] shadow-lg shadow-green-500/50'
        else if (type === 'error') return 'border-[var(--error)] shadow-lg shadow-red-500/50'
        else if (type === 'warning') return 'border-[var(--warning)] shadow-lg shadow-yellow-500/50'
    }, [type])

    useImperativeHandle(ref, () => ({
        trigger: () => handleShowToast()
    }))

    function handleShowToast() {
        setStartAnimation(true)
        let timer = setTimeout(() => {
            setStartAnimation(false)
            clearTimeout(timer)
        }, 5000)
    }

    return (
        <div 
            className={`fixed rounded-5 z-10 border-2 flex flex-col ease-in-out bg-[var(--background)] left-[calc(50%-200px)] min-w-[400px] p-4 transition-all duration-300 top-4 ${style}`}
            style={{ transform: startAnimation ? 'translate(0, 0)' : 'translate(0, -150px)' }}
        >
            <span className="font-semibold text-xl">{title}</span>
            <span className="font-normal text-sm">{desc}</span>
        </div>
    )
})
Toast.displayName = 'Toast'