import { Product } from '@/types'
import ProductFilters from './ProductFilters'
import ProductCard from '../ProductCard'

export const Products = ({ title, setProducts, products } : { title: string, setProducts: Function, products: Product[]}) => {
    return (
        <div className="flex container mx-auto">
            <ProductFilters setProducts={setProducts} />
            <div className='flex flex-wrap gap-8'>
                {products && products.map((inventory: any, index) => {
                    return <ProductCard key={index} product={inventory.product} />
                })}
            </div>
        </div>
    )
}