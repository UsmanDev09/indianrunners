import mongoose, { model, Schema, Types } from 'mongoose'
import { User as UserInterface } from './user'

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: String, unique: true },
    paymentId: { type: String, unique: true },
    paymentSignature: { type: String },
    paid: { type: Boolean, default: false },
    updatedDatabaseAfterPaymentVerification: { type: Boolean, default: false } // to keep track if updateDatabaseAfterPaymentVerified controller has run once, cannot allow it to run twice
}, { timestamps: true })


export interface Order extends Document {
    user: UserInterface
    orderId: string
    paymentId: string
    paymentSignature: string
    paid: boolean
    updatedDatabaseAfterPaymentVerification: boolean
}

export default model<Order>('Order', orderSchema)