import { InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true},
    role: { type: String, enum: ["admin", "user"], default: 'user' },
}, { timestamps: true })

type User = InferSchemaType<typeof userSchema>


export default model<User>('User', userSchema)