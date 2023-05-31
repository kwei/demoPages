import { ProductDataType } from "@/app/dataFetching/type"
import ProductCard from "@/app/(.)product/[id]/ProductCard"
import { ALL_PRODUCT_URL } from "@/app/dataFetching/constants"

const getProductById = async (id: number): Promise<ProductDataType | null> => {
    const res = await fetch(`${ALL_PRODUCT_URL}/${id}`)
    if (!res.ok) return null
    return await res.json()
}

export default async function Home({ params }: { params: { id: number } }) {
    const product = await getProductById(params.id)
    if (!product) return null

    return <ProductCard product={product} />
}