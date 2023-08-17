import { InferSchemaType, model, Schema } from 'mongoose'

const badgeSchema = new Schema({
    name: { type: String, required: [true, 'Badge name is required'] },
    description: { type: String, required: [true, 'Badge description is required'] },
    criteria : {
        activities: { type: [String], required: [true, 'Badge activity is required'], enum: ['running', 'cycling', 'walking', 'swimming', 'climbing'] },
        distance: { type: Number },
        consecutiveDays: { type: Number },
        specificDays: { type: Date },
        numberOfActivities: { type: Number },
    }
}, { timestamps: true })

type Badge = InferSchemaType<typeof badgeSchema>


export default model<Badge>('Badge', badgeSchema)