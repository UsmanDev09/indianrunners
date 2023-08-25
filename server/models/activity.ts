import { InferSchemaType, model, Schema } from 'mongoose'

const activitySchema = new Schema({
    activityType: { type: String, required: true, enum: ['run', 'virtualRun', 'trailRun', 'treadmil', 'walk', 'hike', 'ride', 'mountainBikeRide', 'gravelBikeRide', 'veloMobile', 'virtialRide', 'handcycle', 'swim', 'crossfit', 'elliptical', 'stairStepper', 'weightTraining', 'workout', 'hiit', 'pilates', 'yoga'] },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    elapsedTime: { type: Number, required: true },
    movingTime: { type: Number, required: true },
    distanceCovered: { type: Number, required: true },
    averageSpeed: { type: Number, required: true },
    averageMovingSpeed: { type: Number, required: true },
    maximumSpeed: { type: Number, required: true },
    totalAssent: {type: Number, required: true },
    caloriesBurnt: { type: Number, required: true },
    flag: { type: String, enum: ["approved", "rejected", "underReview", "userReported"]}
}, { timestamps: true })

type Activity = InferSchemaType<typeof activitySchema>


export default model<Activity>('Activity', activitySchema)