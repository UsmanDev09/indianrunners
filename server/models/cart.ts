import { InferSchemaType, model, Schema } from 'mongoose'
import challengeSchema from './challenge'
import challengeCategorySchema from './challengeCategory'

const cartSchema = new Schema({
    itemType: { type: String, enum: ['challenge', 'product'], required: [true, 'Item type is required']},
    itemDetails: [{ 
        challenge: { type: challengeSchema.schema },
        challengeCategories: { type: [challengeCategorySchema.schema], default: [] },  
    }]
}, { timestamps: true })

cartSchema.index({ 'itemDetails.challenge': 1, 'itemDetails.challengeCategories': 1 }, { unique: true, });

type Cart = InferSchemaType<typeof cartSchema>


export default model<Cart>('Cart', cartSchema)