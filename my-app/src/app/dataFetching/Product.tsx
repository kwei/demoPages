import { ProductDataType } from "@/app/dataFetching/type"
import Image from "next/image";
import Link from "next/link";

const Product = ({product}: {product: ProductDataType}) => {
    return (
        <Link className='w-full flex flex-col px-4 py-5 border-b border-[var(--border-rgb)]' href={`/product/${product.id}`}>
            <div className='flex items-start gap-4'>
                <div className='flex shrink-0 items-center justify-center w-20 h-20 overflow-hidden bg-white rounded-2.5'>
                    <Image src={product.image} alt={product.title} width={40} height={40} className='w-10 h-10' />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-2xl font-bold'>{product.title}</span>
                    <span className='text-sm'>Category: {product.category}</span>
                    <span className='text-sm font-semibold'>${product.price}</span>
                </div>
                <div className='flex flex-1 justify-end items-center'>{'>'}</div>
            </div>
        </Link>
    )
}

export default Product