import { InferSchemaType, model, Schema, Types } from 'mongoose'

const productSchema = new Schema({
    name: { type: String, required: [true, "Product name is required"] },
    description: { type: String, required: [true, "Product description is required"] },
    image: { type: String },
    details: {        
        price: { type: Number, required: [true, 'Product price is required'] },
    },
    rewardPoints: { type: Number },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

export interface Product extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    details: {
        price: number;
        image?: Buffer;
    };
    rewardPoints?: number;
    isDeleted: boolean;
}

export default model<Product>('Product', productSchema)