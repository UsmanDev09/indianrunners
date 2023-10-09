import { InferSchemaType, model, Schema } from 'mongoose'

const inventorySchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'Please select a product']},
    details: {
        size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: [true, 'Please specify quantity for this product'] },
        quantity: { type: Number, required: [true, 'Please specify product quantity'] },
        color: { type: String, required: [true, 'Please specify product color']}
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

inventorySchema.index({ product: 1, 'details.size': 1, 'details.quantity': 1, 'details.color': 1 }, { unique: true });

export type Inventory = InferSchemaType<typeof inventorySchema>

export default model<Inventory>('Inventory', inventorySchema)