import { InferSchemaType, model, Schema } from 'mongoose'
import challengeCategorySchema from './challengeCategory'

const challengeSchema = new Schema({
    name: { type: String, required: [true, 'Challange name is required']},
    type: { type: String, enum: ['open', 'fixed']},
    activity: { type: String, enum: ['single', 'multiple']},
    knockout: { type: Boolean },
    knockoutType: { type: String, enum: ['daily', 'hourly']},
    lowerLimit: { type: Number },
    upperLimit: { type: Number },
    fixedlimit: { type: Number },
    cutOffDays: { type: Number },
    cutOffHours: { type: Number },
    image: { type: String }, // 1920 * 1080
    startDate: { type: Date, required: [true, 'Challenge start date is required']},
    endDate: { type: Date, required: [true, 'Challenge end date is required']},
    sport: { type: String, enum: ['running', 'cycling', 'swimming', 'walking', 'workout']},
    tags: { type: String, enum: ['challenge', 'run', 'ride', 'swim', 'walk', 'workout', 'dualthon', 'triathlon', 'monthly', 'annual']},
    bibNumber: { type: Number }, 
    featured: { type: Boolean },
    verified: { type: Boolean },
    organizationName: { type: String },
    price: { type: Number, required: [true, 'Challenge price is required']},
    categories: { type: [challengeCategorySchema.schema], default: [] }

}, { timestamps: true })

type Challenge = InferSchemaType<typeof challengeSchema>


export default model<Challenge>('Challenge', challengeSchema)