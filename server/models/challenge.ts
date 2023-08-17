import { InferSchemaType, model, Schema } from 'mongoose'
import categorySchema from './category'

const challengeSchema = new Schema({
    type: { type: String, enum: ['challenge', 'event', 'timedRace']},
    name: { type: String, required: [true, 'Challange name is required']},
    image: { type: String }, // 1920 * 1080
    startDate: { type: Date, required: [true, 'Challenge start date is required']},
    endDate: { type: Date, required: [true, 'Challenge end date is required']},
    logic: { type: String, enum: ['formulas']},
    sport: { type: String, enum: ['running', 'cycling', 'swimming', 'walking', 'workout']},
    tags: { type: String, enum: ['challenge', 'run', 'ride', 'swim', 'walk', 'workout', 'dualthon', 'triathlon', 'monthly', 'annual']},
    bibNumber: { type: Number }, 
    featured: { type: Boolean },
    verified: { type: Boolean },
    organizationName: { type: String },
    price: { type: Number, required: [true, 'Challenge price is required']},
    categories:{ type: [categorySchema], default: [] }

}, { timestamps: true })

type Challenge = InferSchemaType<typeof challengeSchema>


export default model<Challenge>('Challenge', challengeSchema)