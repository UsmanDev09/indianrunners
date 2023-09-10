import { InferSchemaType, model, Schema } from 'mongoose'
import activitySchema from './activity'
import cartSchema from './cart'
import shippingDetail from './shippingDetail'
import badgeSchema from './badge'

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String, enum: ["male", "femaile"] },
    weight: { type: Number },
    height: { type: Number },
    contact: { type: Number },
    country: { type: String },
    state: { type: String },
    city: {type: String },
    role: { type: String, enum: ["admin", "user"], default: 'user' },
    profileCompleted: { type: Number },
    profilePicture: { type: String },
    club: { type: String, enum: ["Spartans", "Vikings", "Avengers", "Ninjas"] },
    appsConnected: {type: String, enum: ["Strava", "Garmin", "Runtastic"]},
    activities: { type: [activitySchema.schema], default: [] },
    cart: { type: [cartSchema.schema], default: []},
    shippingDetail: { type: [shippingDetail.schema], default: []},
    badges: { type: [badgeSchema.schema], default: []}
}, { timestamps: true })

type User = InferSchemaType<typeof userSchema>


export default model<User>('User', userSchema)