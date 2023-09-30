import { RequestHandler } from "express"
import createHttpError from 'http-errors'
import axios from 'axios'
import { StatusCodes } from "http-status-codes"

import ActivityModel from "../models/activity"
import UserModel from "../models/user"
import { StravaInterface } from "../interfaces/strava"
import { StravaActivity } from "../interfaces/stravaActivity"
import { Constants } from "../utility/constants"
import { User as UserInterface } from "../models/user"
import logger from "../config/logger"
import UserChallengesModel from "../models/userChallenges"
import { updateLeaderboard } from "../helpers/helper"
import { UserChallengesInterface } from "../interfaces/userChallenges"
import { ActivityInterface } from "../interfaces/activity"

export const authorizeToGetActivityFromStrava: RequestHandler<unknown, unknown, StravaInterface, unknown> = async (req, res, next) => {
    try {
        const { code }  = req.body

        const { _id } = req.user as UserInterface

        if (!code)
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.requiredParameters('code'))
                                        //    http://www.strava.com/oauth/token?client_id=113257&client_secret=34df2bc2346cd5376e854a968afa18fa5d35f851&code=a13bb2e68bc42f35b2917d578167c00eb55247eb&grant_type=authorization_code
        const response = await axios.post(`http://www.strava.com/oauth/token?client_id=113257&client_secret=34df2bc2346cd5376e854a968afa18fa5d35f851&code=${code}&grant_type=authorization_code`)
        const { access_token, refresh_token, expires_at, expires_in } = response.data;

        const activitiesResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`)

        const { data } = activitiesResponse 
        
        const user = await UserModel.findByIdAndUpdate(_id, { access_token, refresh_token, expires_at, expires_in, appsConnected: 'Strava' })

        if(!user) throw createHttpError(StatusCodes.UNAUTHORIZED, Constants.loginToProceed)

        let activitiesDocument : any = []

        // const userChallenges = await UserChallengesModel.find({ 'user._id': user._id }) as UserChallengesInterface[]

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
               
        res.status(StatusCodes.OK).json({
            success: true,
            message: Constants.activityCreatedSuccessfully
        })
    } catch(error: unknown) {
        if( error instanceof Error)
            console.log(error.message)
        logger.error(error)
        next(error)
    }

}

export const getActivitiesFromStrava: RequestHandler<unknown, unknown, StravaInterface, unknown> = async (req, res, next) => { 
    try {
        const { _id } = req.user as UserInterface

        const user = await UserModel.findById(_id) as UserInterface

        const { access_token, refresh_token, expires_at } = user 
        const currentTime = new Date()

        if(!expires_at) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.tokenExpiryTimeNotFound)
        const expiryTime = new Date(expires_at)

        if (expiryTime > currentTime) {
            const activitiesResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`)
            
            const { data } = activitiesResponse 
            
            let activitiesDocument : ActivityInterface[] = []

            for (let activity of data) {
                // let start_date = new Date(activity.start_date_local) 
                // let startTime = `${start_date.getUTCHours()}:${start_date.getUTCMinutes()}:${start_date.getUTCSeconds()}`

                const redundantActivity = await ActivityModel.findOne({activityId: activity.id})

                if (!redundantActivity) {
                    let userActivity = await ActivityModel.create({
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

                    const userActivityObject = userActivity.toObject() as ActivityInterface
                    
                    activitiesDocument.push(userActivityObject)
                }
            }

            await UserModel.updateOne({ _id }, { $push: { 'activities': activitiesDocument }})
            
            const userChallenges = user.challenges

            const activities = user.activities

            if (userChallenges) 
                updateLeaderboard(user, activities, userChallenges)

        } else {
            const response = await axios.post(`http://www.strava.com/oauth/token?client_id=113257&client_secret=34df2bc2346cd5376e854a968afa18fa5d35f851&grant_type=refresh_token&refresh_token=${refresh_token}`) 
            const { access_token, refresh_token: refreshTokenFromStrava, expires_at, expires_in } = response.data;
            
            const user = await UserModel.findByIdAndUpdate(_id, { access_token, refresh_token: refreshTokenFromStrava, expires_at, expires_in })

            if(!user) throw createHttpError(StatusCodes.UNAUTHORIZED, Constants.loginToProceed)

            const activitiesResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`)
            const { data } = activitiesResponse 
            
            let activitiesDocument : ActivityInterface[] = []

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

                    const userActivityObject = userActivity.toObject() as ActivityInterface

                    activitiesDocument.push(userActivityObject)
                }
            }
            
            await UserModel.updateOne({ _id }, { $push: { 'activities': activitiesDocument }})

            const userChallenges = user.challenges

            const activities = user.activities

            if (userChallenges) 
                updateLeaderboard(user, activities, userChallenges)

        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: user.activities,
            message: 'Activities fetched successfully from Strava',
        })

    } catch (err: unknown) {
        if(err instanceof Error) console.log(err.message)
        logger.error(err)
        // next(err)
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
        const { _id } = req?.user as UserInterface;
        const user = await UserModel.findById(_id)

        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

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

