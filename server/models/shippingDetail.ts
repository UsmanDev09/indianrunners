import { model, Schema, Types } from 'mongoose'

const shippingDetailSchema = new Schema({
    contact: { type: String, required: [true, 'Contact is required' ]},
    address: { type: String, required: [true, 'Address is required']},
    city: { type: String, required: [true, 'City is required']},
    country: { type: String, required: [true, 'Country is required']},
    state: { type: String, required: [true, 'State is required']}
}, { timestamps: true })


export interface ShippingDetails extends Document {
    _id: Types.ObjectId
    contact: string
    address: string
    city: string 
    country: string
    state: string
}

export default model<ShippingDetails>('ShippingDetail', shippingDetailSchema)