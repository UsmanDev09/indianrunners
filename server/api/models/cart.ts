import { InferSchemaType, model, Schema } from 'mongoose'
import challengeSchema from './challenge'
import challengeCategorySchema from './challengeCategory'
import productSchema from './product'

const cartSchema = new Schema({
    itemType: { type: String, enum: ['challenge', 'product'], required: [true, 'Item type is required']},
    itemDetails: [{ 
        challenge: { type: challengeSchema.schema },
        challengeCategories: { type: [challengeCategorySchema.schema], default: [] },
        product: { type: productSchema.schema },
        productQuantity: { type: Number } 
    }]
}, { timestamps: true })


export type Cart = InferSchemaType<typeof cartSchema>


export default model<Cart>('Cart', cartSchema)