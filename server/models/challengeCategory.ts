import { InferSchemaType, model, Schema } from 'mongoose'

const challengeCategorySchema = new Schema({
    activity: { type: String, required: [true, "Category activity is required"] },
    distance: { type: Number, required: [true, "Category distance is required"] },
    description: { type: String, required: [true, "Category description is required"] }
}, { timestamps: true })

type Category = InferSchemaType<typeof challengeCategorySchema>


export default model<Category>('ChallengeCategory', challengeCategorySchema)