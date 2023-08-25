export interface Product {
    _id: number,
    name: string,
    description: string,
    details: {
        price: number,
        quantity: number,
        image: Buffer,
        color: string
    }
} 