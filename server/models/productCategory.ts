import { InferSchemaType, model, Schema } from 'mongoose'
import productSchema from './product'

const productCategorySchema = new Schema({
    name: { type: String, required: [true, "Category name is required"] },
    description: { type: String, required: [true, "Category description is required"] },

    products: { type: [productSchema.schema], default: [] }
}, { timestamps: true })

type productCategory = InferSchemaType<typeof productCategorySchema>


export default model<productCategory>('ProductCategory', productCategorySchema)