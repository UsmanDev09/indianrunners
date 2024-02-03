import ActivityModel from '../models/activity'

export const getAllActivities = () => {
    return ActivityModel.find({});
}