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

export const postActivity: RequestHandler<unknown, unknown, StravaInterface, unknown> = async (req, res, next) => {
    try {
       const code  = 'd9b5005d6e3986d4305b7604f75b885f8285362e'
       const { id } = req?.headers;


        if (!(code))
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.requiredParameters('code'))

        const response = await axios.post(`http://www.strava.com/oauth/token?client_id=31900&client_secret=9e59e63414d00fc900c368fbd3dbb77f37eaf053&code=${code}&grant_type=authorization_code`)
        const { refresh_token, access_token } = response.data;

        const activitiesResponse = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })

        const { data } = activitiesResponse 
        const user = await UserModel.findById(id)

        if(!user) throw createHttpError(StatusCodes.UNAUTHORIZED, Constants.loginToProceed)

        data.map((activity : StravaActivity) => {  
            const userActivity = new ActivityModel({
                activityType: activity.sport_type,
                elapsedTime: activity.elapsed_time,
                movingTime: activity.moving_time,
                maximumSpeed: activity.max_speed,
                averageSpeed: activity.average_speed,
                caloriesBurnt: activity.calories,
                distanceCovered: activity.distance,
                totalAssent: activity.elev_high - activity.elev_low,
                date: activity.start_date,   // start time can be calculated from date, and end time by subtracting moving time
            })
            
            // user.activities.push([userActivity])
        })

        res.status(StatusCodes.OK).json({
            success: true,
            data,
            message: Constants.userLoggedInSuccessfully
        })
    } catch(error) {
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
        next(error)
    }
}

export const getActivitiesByUser: RequestHandler<unknown, unknown, StravaInterface, unknown> = async(req, res, next) => {
    try {
        const { _id } = req?.user as User;
        const user = await UserModel.findById(_id)

        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        // const activities = user.activities

        return res.json(StatusCodes.OK).json({
            success: true,
            // data: activities,
        })


    } catch (error) {
        next(error)
    }
}

