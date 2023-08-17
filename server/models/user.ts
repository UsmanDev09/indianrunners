import { InferSchemaType, model, Schema } from 'mongoose'
import activitySchema from './activity'

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["male", "femaile", "binary", "other"] },
    weight: { type: Number },
    height: { type: Number },
    contact: { type: Number },
    country: { type: String },
    state: { type: String },
    city: {type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: 'user' },
    profileCompleted: { type: Number, default: '0%' },
    profilePicture: { type: String },
    club: { type: String, enum: ["Spartans", "Vikings", "Avengers", "Ninjas"] },
    appsConnected: {type: String, enum: ["Strava", "Garmin", "Runtastic"]},
    activities:{ type: [activitySchema], default: [] }
    
}, { timestamps: true })

type User = InferSchemaType<typeof userSchema>


export default model<User>('User', userSchema)