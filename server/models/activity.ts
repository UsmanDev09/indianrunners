import { InferSchemaType, model, Schema, Types } from 'mongoose'
import { Queue } from 'bullmq';

const activitySchema = new Schema({
    activityId: { type: Number, required: true},
    userId: { type: Schema.Types.ObjectId, required: true },
    athleteId: { type: Number },
    activityType: { type: String, required: true, enum: ['Run', 'VirtualRun', 'TrailRun', 'Treadmil', 'Walk', 'Hike', 'Ride', 'MountainBikeRide', 'GravelBikeRide', 'VeloMobile', 'VirtialRide', 'HandCycle', 'Swim', 'CrossFit', 'Elliptical', 'StairStepper', 'WeightTraining', 'Workout', 'Hiit', 'Pilates', 'Yoga'] },
    date: { type: Date },
    startDate: { type: Date }, // start time can be calculated and end time can be calculated by subtracting moving time
    endTime: { type: Date },
    elapsedTime: { type: Number },
    movingTime: { type: Number },
    distanceCovered: { type: Number },
    averageSpeed: { type: Number },
    averageMovingSpeed: { type: Number },
    maximumSpeed: { type: Number },
    totalAssent: {type: Number },
    caloriesBurnt: { type: Number },
    status: { type: String, enum: ["approved", "rejected", "underReview"]},
    app: { type: String, enum: ["strava", "gramin", "manual"]}
    
}, { timestamps: true })

activitySchema.pre('save', async function (next) {
    
    const myQueue = new Queue('badges');

    await myQueue.add('awardBadges', this!);
    
    next()
})

export interface Activity extends Document {
    _id: Types.ObjectId
    activityId: number
    userId: number
    athleteId: number
    activityType: string
    date: string
    startDate: string
    endTime: string
    elapsedTime: string
    movingTime: string
    distanceCovered: number
    averageSpeed: number
    averageMovingSpeed: number
    maximumSpeed: number
    totalAssent: number
    caloriesBurnt: number
    status: string
    app: string
}

export default model<Activity>('Activity', activitySchema)