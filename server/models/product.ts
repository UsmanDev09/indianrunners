import { InferSchemaType, model, Schema } from 'mongoose'

const productSchema = new Schema({
    name: { type: String, required: [true, "Product name is required"] },
    description: { type: String, required: [true, "Product description is required"] },
    details: {
        quantity: { type: Number, required: [true, 'Product quantity is required'] },
        price: { type: Number, required: [true, 'Product price is required'] },
        image: { type: Buffer },
        color: { type: String, required: [true, 'Product color is required'] },
    }
}, { timestamps: true })

type product = InferSchemaType<typeof productSchema>


export default model<product>('Product', productSchema)