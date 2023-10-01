export interface ActivityInterface {
    activityId : number
    userId: number
    athleteId: number
    activityType: string
    date: Date
    startDate: Date
    endTime: Date
    elapsedTime: number
    movingTime: number
    distanceCovered: number
    averageSpeed: number 
    averageMovingSpeed: number
    maximumSpeed: number
    totalAssent: number
    caloriesBurnt: number
    flag: string
}
