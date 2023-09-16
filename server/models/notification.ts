import { InferSchemaType, model, Schema } from 'mongoose'
import * as socket from '../utility/socket'

const notificationSchema = new Schema({
    type: { type: String, enum: ['badges', 'challenge'] },
    message: { type: String },
    read: { type: Boolean, default: false }
}, { timestamps: true })

notificationSchema.post('save', async function (next){
    const io = socket.getIO()
    io.emit('notification', this)
})

type Notification = InferSchemaType<typeof notificationSchema>

export default model<Notification>('Notification', notificationSchema)