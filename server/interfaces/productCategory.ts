import { Product } from "./product"

export interface productCategory {
    id: number,
    name: string,
    description: string,
    products: [Product]
} 