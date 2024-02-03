import { Product } from '@/types'
import ProductFilters from './ProductFilters'
import ProductCard from '../ProductCard'

export const Products = ({ title, setProducts, products } : { title: string, setProducts: Function, products: Product[]}) => {
    return (
        <div className="flex mx-auto container justify-start">
            <ProductFilters setProducts={setProducts} />
            <div className='flex flex-col sm:flex-row mx-auto justify-center flex-wrap'>
                {products && products.map((inventory: any, index) => {
                    return <ProductCard key={index} product={inventory.product} />
                })}
            </div>
        </div>
    )
}