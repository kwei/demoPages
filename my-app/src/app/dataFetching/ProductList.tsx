import {ProductDataType} from "@/app/dataFetching/type";
import Product from "@/app/dataFetching/Product";

const ProductList = ({products}: {products: ProductDataType[]}) => {
    return (
        <div className='w-full flex items-stretch flex-wrap'>
            {products.map((product, index) => (
                <Product key={product.id + '-' + index} product={product} />
            ))}
        </div>
    )
}

export default ProductList