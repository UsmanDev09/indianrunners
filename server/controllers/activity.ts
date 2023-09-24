import { RequestHandler } from "express"
import createHttpError from 'http-errors'
import axios from 'axios'
import { StatusCodes } from "http-status-codes"

import ActivityModel from "../models/activity"
import UserModel from "../models/user"
import { StravaInterface } from "../interfaces/strava"
import { StravaActivity } from "../interfaces/stravaActivity"
import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"
import logger from "../config/logger"
import UserChallenges from "../models/userChallenges"
import { UserChallengesInterface } from "../interfaces/userChallenges"

export const postActivity: RequestHandler<unknown, unknown, StravaInterface, unknown> = async (req, res, next) => {
    try {

        const { code }  = req.body

        const { _id } = req.user as User;

        if (!code)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.requiredParameters('code'))

        const response = await axios.post(`http://www.strava.com/oauth/token?client_id=113257&client_secret=37c1602c284ad0fcf8fec326198e60e2d84a2a38&code=${code}&grant_type=authorization_code`)
        
        const { access_token } = response.data;

        const activitiesResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`)

        const { data } = activitiesResponse 
        
        const user = await UserModel.findById(_id)

        if(!user) throw createHttpError(StatusCodes.UNAUTHORIZED, Constants.loginToProceed)

        let activitiesDocument : any = []

        for (let activity of data) {
            // let start_date = new Date(activity.start_date_local) 
            // let startTime = `${start_date.getUTCHours()}:${start_date.getUTCMinutes()}:${start_date.getUTCSeconds()}`

            const redundantActivity = await ActivityModel.findOne({activityId: activity.id})

            if (!redundantActivity) {
                const userActivity = new ActivityModel({
                    activityId: activity.id,
                    userId: _id,
                    activityType: activity.sport_type,
                    elapsedTime: activity.elapsed_time,
                    movingTime: activity.moving_time,
                    maximumSpeed: activity.max_speed,
                    averageSpeed: activity.average_speed,
                    caloriesBurnt: activity.calories,
                    distanceCovered: activity.distance,
                    totalAssent: activity.total_elevation_gain,
                    startDate: activity.start_date   // start time can be calculated from date, and end time by subtracting moving time
                })
                
                userActivity.save();

                activitiesDocument.push(userActivity)
            }
        }

        await UserModel.updateOne({ _id }, { $push: { 'activities': activitiesDocument }})

        const userChallenges = await UserChallenges.find({ user: user._id })
        
        // if(userChallenges.challenges.length > 0) {
            // check if activity is between start date and end date 


            // check if challenge is open and challenge category is related to activity type

            // check if type is not knockout then 

            // fetch all users in the challenge and rank according to distance covered

            // if some users are equal, check for pace, then check for qualified days/hours, then age (older ranks above), then gender (female ranks above)

            // if knockout then on daily, run cron jobs for fetching data every day and check if lower limit is completed and qualified days 

            // rank according to qualified days, then distance, then speed

            // if knockout is hourly, run cron jobs every hour for fetching data and check if lower limit is completed and qualified hours

            // if knockout is hourly and strava is connected, run webhooks 

            // rank accoridng to qualified hours and then speed

            // check if challenge is fixed and repeat algo for knockout 

            // if not knockout 

            // check if distance covered is more than upper limit, freeze the leaderboard

            // rank according to same priorities

           
        // }

        res.status(StatusCodes.OK).json({
            success: true,
            message: Constants.activityCreatedSuccessfully
        })
    } catch(error) {
        logger.error(error)
        next(error)
    }

}

export const postManualActivity: RequestHandler<unknown, unknown, StravaActivity, unknown> = async(req, res, next) => {
    try { 
        const { 
            sport_type, start_date, start_time,
            end_time, elapsed_time, moving_time,
            distance, average_speed, average_moving_speed, 
            max_speed, total_ascent, calories,
            elev_high, elev_low,
         } = req.body

        const { id } = req.headers

        if( !(sport_type || start_date || start_time || end_time || elapsed_time || moving_time || distance || 
            average_speed || average_moving_speed || max_speed || total_ascent || calories || elev_high || elev_low))
            throw createHttpError(400, Constants.requiredParameters)
            
        const activity = {
            sport_type, start_date, start_time,
            end_time, elapsed_time, moving_time,
            distance, average_speed, average_moving_speed, 
            max_speed, total_ascent, calories,
            elev_high, elev_low,
        }
        const user = await UserModel.findById(id)

        if(!user) throw createHttpError(StatusCodes.UNAUTHORIZED, Constants.loginToProceed)

        // user.activities.push([activity])


    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getActivitiesByUser: RequestHandler<unknown, unknown, StravaInterface, unknown> = async(req, res, next) => {
    try {
        const { _id } = req?.user as User;
        const user = await UserModel.findById(_id)

        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)
        console.log(user.activities)
        const activities = user.activities
        
        res.status(StatusCodes.OK).json({
            success: true,
            data: activities,
        })


    } catch (error) {
        logger.error(error)
        next(error)
    }
}

