import { InferSchemaType, model, Schema, Types } from 'mongoose'
import challengeCategorySchema, { Category } from './challengeCategory'
import leaderboardSchema from './leaderboard'
import userSchema, { User } from './user'

const challengeSchema = new Schema({
    name: { type: String, required: [true, 'Challange name is required'], unique: [true, 'Challenge name is already taken']},
    type: { type: String, enum: ['open', 'fixed'], required: [true, 'Challenge type is required']},
    activity: { type: String, enum: ['single', 'multiple'], required: [true, 'Challenge activity is required']},
    knockout: { type: Boolean, required: [true, 'Is the challenge knockout ot not?'] },
    knockoutType: { type: String, enum: ['daily', 'hourly']},
    lowerLimit: { type: Number },
    upperLimit: { type: Number },
    fixedLimit: { type: Number },
    cutOffDays: { type: Number },
    cutOffHours: { type: Number },
    image: { type: String }, // 1920 * 1080
    startDate: { type: Date, required: [true, 'Challenge start date is required']},
    endDate: { type: Date, required: [true, 'Challenge end date is required']},
    sport: { type: String, enum: ['Run', 'VirtualRun', 'TrailRun', 'Treadmil', 'Walk', 'Hike', 'Ride', 'MountainBikeRide', 'GravelBikeRide', 'VeloMobile', 'VirtialRide', 'HandCycle', 'Swim', 'CrossFit', 'Elliptical', 'StairStepper', 'WeightTraining', 'Workout', 'Hiit', 'Pilates', 'Yoga']},
    tags: { type: String, enum: ['challenge', 'run', 'ride', 'swim', 'walk', 'workout', 'dualthon', 'triathlon', 'monthly', 'annual']},
    bibNumber: { type: Number }, 
    featured: { type: Boolean },
    verified: { type: Boolean },
    organizationName: { type: String },
    price: { type: Number, required: [true, 'Challenge price is required']},
    categories: { type: [challengeCategorySchema.schema], default: [] },
    users: [{ type: Schema.Types.ObjectId, ref: 'user'}]
 
}, { timestamps: true })

export interface Challenge extends Document {
    _id: Types.ObjectId,
    name: String
    type: String
    activity: String
    knockout: Boolean
    knockoutType: String
    lowerLimit: Number
    upperLimit: Number
    fixedLimit: Number
    cutOffDays: Number
    cutOffHours: Number
    image: String
    startDate: Date
    endDate: Date
    sport: String
    tags: String
    bibNumber:  Number
    featured: Boolean
    verified: Boolean
    organizationName: String
    price: Number
    categories: Category[]
}

export default model<Challenge>('Challenge', challengeSchema)