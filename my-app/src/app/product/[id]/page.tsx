import { ProductDataType } from "@/app/dataFetching/type"
import Image from "next/image"
import { ALL_PRODUCT_URL } from "@/app/dataFetching/constants"

const getProductById = async (id: number): Promise<ProductDataType | null> => {
    const res = await fetch(`${ALL_PRODUCT_URL}/${id}`)
    if (!res.ok) return null
    return await res.json()
}

export default async function Home({params}: { params: { id: number } }) {
    const product = await getProductById(params.id)
    if (!product) return null
    return (
        <div className='my-auto w-full h-full flex flex-col gap-8'>
            <div className='flex gap-8'>
                <div className='w-50 h-50 flex items-center justify-center overflow-hidden bg-white p-3 rounded-2.5'>
                    <Image src={product.image} alt={product.title} width={100} height={100}/>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-2xl font-bold'>${product.price}</span>
                    <span className='text-2xl font-bold'>{product.title}</span>
                    <span className='text-xl font-semibold'>Category: {product.category}</span>
                    <span className='text-sm'>Rate: {product.rating.rate} ({product.rating.count})</span>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm text-gray-500 font-semibold'>Description</label>
                <p className='text-sm'>{product.description}</p>
            </div>
        </div>
    )
}