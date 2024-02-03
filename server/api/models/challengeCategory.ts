import { InferSchemaType, model, Schema, Types } from 'mongoose'

const challengeCategorySchema = new Schema({
    name: { type: String, required: [true, "Category name is required"] },
    activity: { type: String, required: [true, "Category activity is required"], enum: ['run', 'virtualRun', 'trailRun', 'treadmil', 'walk', 'hike', 'ride', 'mountainBikeRide', 'gravelBikeRide', 'veloMobile', 'virtialRide', 'handcycle', 'swim', 'crossfit', 'elliptical', 'stairStepper', 'weightTraining', 'workout', 'hiit', 'pilates', 'yoga']  },
    distance: { type: Number, required: [true, "Category distance is required"] },
    description: { type: String, required: [true, "Category description is required"] },
    image: { type: String }, // 1920 * 1080
}, { timestamps: true })


export interface Category extends Document {
    _id: Types.ObjectId,
    name: String
    activity: String
    distance: Number
    description: String
}
    
export default model<Category>('ChallengeCategory', challengeCategorySchema)