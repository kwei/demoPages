'use client'

import {ReactNode, useCallback, useState} from "react";

interface ModalPropsType {
    children: ReactNode
    show?: boolean
    onClose?: () => void
}

export const Modal = ({ children, show = true, onClose }: ModalPropsType) => {
    const [showModal, setShowModal] = useState<boolean>(show)

    const handleCloseModal = useCallback(() => {
        setShowModal(false)
        if (onClose) onClose()
    }, [onClose])

    if (!showModal) return null

    return (
        <div className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60" onClick={handleCloseModal}>
            <div className="absolute top-1/2 left-1/2 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6">
                {children}
            </div>
        </div>
    )
}