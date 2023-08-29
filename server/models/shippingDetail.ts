import { InferSchemaType, model, Schema } from 'mongoose'

const shippingDetailSchema = new Schema({
    address: { type: String, required: [true, 'Address is required']},
    city: { type: String, required: [true, 'City is required']},
    state: { type: String, required: [true, 'State is required']}
}, { timestamps: true })

type ShippingDetails = InferSchemaType<typeof shippingDetailSchema>


export default model<ShippingDetails>('ShippingDetail', shippingDetailSchema)