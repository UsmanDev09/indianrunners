import { InferSchemaType, model, Schema } from 'mongoose'
import challengeSchema from './challenge'
import challengeCategorySchema from './challengeCategory'
const cartSchema = new Schema({
    itemType: { type: String, enum: ['challenge', 'product'], required: [true, 'Item type is required']},
    itemDetails: [{ 
        challenges: {type: challengeSchema.schema },
        challengeCategory: {type: challengeCategorySchema.schema },  
    }],
}, { timestamps: true })

type Cart = InferSchemaType<typeof cartSchema>


export default model<Cart>('Cart', cartSchema)