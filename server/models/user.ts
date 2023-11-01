import { InferSchemaType, model, Schema, Types } from 'mongoose'
import activitySchema from './activity'
import cartSchema from './cart'
import shippingDetail from './shippingDetail'
import badgeSchema from './badge'
import challengeSchema from './challenge'
import { ShippingDetails } from '../interfaces/shippingDetail'
import { Activity as ActivityInterface } from './activity'
import { Cart as CartInterface } from './cart'
import { Badge as BadgeInterface } from './badge'
import { Challenge as ChallengeInterface } from './challenge'

const userSchema = new Schema({
    athlete_id: { type: Number },
    google_id: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    userName: { type: String, unique: true },
    dob: { type: Date },
    gender: { type: String },
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
    appsConnected: {type: String, enum: ["Strava", "Garmin", "GoogleFit"]},
    access_token: { type: String },
    refresh_token: { type: String },
    expires_at: { type: Date },
    expires_in: { type: Number },
    activities: { type: [activitySchema.schema], default: [] },
    cart: { type: [cartSchema.schema], default: []},
    shippingDetail: { type: [shippingDetail.schema], default: []},
    badges: { type: [badgeSchema.schema], default: []},
    challenges: { type: [challengeSchema.schema], default: []},
    rewardPoints: { type: Number, default: 0 },
<<<<<<< HEAD
    certificates: { type: [String], default: [] }
=======
    authenticator: { type: String, enum: ["local", "google", "facebook"], default: "local"}
>>>>>>> bbb7ae39a57e89ca642937c6f5d0f6edde5ce40d
}, { timestamps: true })

export interface User extends Document {
    _id: Types.ObjectId
    athlete_id: number
    email: string
    password: string
    firstName: string
    lastName: string    
    userName: string    
    dob: Date 
    gender: string
    weight: number
    height: number
    contact: number
    country: string
    state: string
    city: string
    role: string
    profileCompleted: number
    profilePicture: string | undefined
    club: string
    appsConnected: string
    access_token: string
    refresh_token: string
    expires_at: number
    expires_in: number
    activities: ActivityInterface[]
    cart: CartInterface[]
    shippingDetail: ShippingDetails[]
    badges: BadgeInterface[]
    challenges: ChallengeInterface[]
    rewardPoints: number
    certificates: string[]
    
}

export default model<User>('User', userSchema)