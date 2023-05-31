'use client'

import { ProductDataType } from "@/app/dataFetching/type"
import Image from "next/image"
import { Modal } from "@/components/Modal"
import { useRouter } from "next/navigation"
import {memo} from "react";

const ProductCard = memo(({product}: { product: ProductDataType }) => {
    console.log("ArticleCard: ", product)
    const router = useRouter()
    const onCloseModal = () => {
        router.back()
    }

    return (
        <Modal onClose={onCloseModal}>
            <div className='w-full flex flex-col gap-8 items-center rounded-2.5 border border-[var(--border-rgb)] p-12'>
                <div className='w-full flex items-center justify-center overflow-hidden bg-white p-3 rounded-2.5'>
                    <Image src={product.image} alt={product.title} width={200} height={200}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-2xl font-bold'>${product.price} {product.title}</span>
                    <span className='text-xl font-semibold'>Category: {product.category}</span>
                    <span className='text-sm'>Rate: {product.rating.rate} ({product.rating.count})</span>
                </div>
                <p className='text-sm'>{product.description}</p>
            </div>
        </Modal>
    )
})
ProductCard.displayName = 'ProductCard'

export default ProductCard