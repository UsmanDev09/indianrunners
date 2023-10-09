import { model, Schema, Types } from 'mongoose'

const shippingDetailSchema = new Schema({
    address: { type: String, required: [true, 'Address is required']},
    city: { type: String, required: [true, 'City is required']},
    state: { type: String, required: [true, 'State is required']}
}, { timestamps: true })


export interface ShippingDetails extends Document {
    _id: Types.ObjectId
    address: string
    city: string 
    state: string
}

export default model<ShippingDetails>('ShippingDetail', shippingDetailSchema)