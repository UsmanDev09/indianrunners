import { InferSchemaType, model, Schema } from 'mongoose'
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
    flag: { type: String, enum: ["approved", "rejected", "underReview", "userReported"]}
}, { timestamps: true })

activitySchema.pre('save', async function (next) {
    
    const myQueue = new Queue('badges');

    await myQueue.add('awardBadges', this!);
    console.log('added to queue')
    next()
})

type Activity = InferSchemaType<typeof activitySchema>


export default model<Activity>('Activity', activitySchema)