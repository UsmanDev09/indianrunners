import { model, Schema, Types } from 'mongoose'

const badgeSchema = new Schema({
    name: { type: String, required: [true, 'Badge name is required'] },
    description: { type: String, required: [true, 'Badge description is required'] },
    image: { type: String },
    criteria : {
        activities: [{ type: String, required: [true, 'Badge activity is required'], enum: ['Run', 'VirtualRun', 'TrailRun', 'Treadmil', 'Walk', 'Hike', 'Ride', 'MountainBikeRide', 'GravelBikeRide', 'VeloMobile', 'VirtialRide', 'HandCycle', 'Swim', 'CrossFit', 'Elliptical', 'StairStepper', 'WeightTraining', 'Workout', 'Hiit', 'Pilates', 'Yoga']  }],
        distance: { type: Number },
        consecutiveDays: { type: Number },
        specificDays: { type: Date },
        numberOfActivities: { type: Number },
        category: { type: String, enum: ["Single Activity", "Special Achievement", "Challenge", "Total Distance", "Multiple Activities"]}
    }
}, { timestamps: true })


export interface Badge extends Document {
    _id: Types.ObjectId
    name: string
    description: string
    image: string
    criteria: object
}

export default model<Badge>('Badge', badgeSchema)