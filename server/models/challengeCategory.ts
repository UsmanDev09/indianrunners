import { InferSchemaType, model, Schema } from 'mongoose'

const challengeCategorySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, unique: true },
    name: { type: String, required: [true, "Category name is required"] },
    activity: { type: String, required: [true, "Category activity is required"], enum: ['run', 'virtualRun', 'trailRun', 'treadmil', 'walk', 'hike', 'ride', 'mountainBikeRide', 'gravelBikeRide', 'veloMobile', 'virtialRide', 'handcycle', 'swim', 'crossfit', 'elliptical', 'stairStepper', 'weightTraining', 'workout', 'hiit', 'pilates', 'yoga']  },
    distance: { type: Number, required: [true, "Category distance is required"] },
    description: { type: String, required: [true, "Category description is required"] }
}, { timestamps: true })

export type Category = InferSchemaType<typeof challengeCategorySchema>

export default model<Category>('ChallengeCategory', challengeCategorySchema)