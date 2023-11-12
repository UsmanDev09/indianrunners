import { RequestHandler } from "express"
import createHttpError from 'http-errors'
import axios from 'axios'
import { StatusCodes } from "http-status-codes"
import { uuid } from "uuidv4"

import ActivityModel from "../models/activity"
import UserModel from "../models/user"
import { StravaInterface } from "../interfaces/strava"
import { StravaActivity } from "../interfaces/stravaActivity"
import { Constants } from "../utility/constants"
import { User as UserInterface } from "../models/user"
import logger from "../config/logger"
import { updateLeaderboard } from "../helpers/helper"
import { Activity as ActivityInterface } from "../models/activity"

export const authorizeToGetActivityFromStrava: RequestHandler<unknown, unknown, StravaInterface, unknown> = async (req, res, next) => {
    try {
        const { code }  = req.body

        const _id = req.user as UserInterface

        if (!code)
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.requiredParameters('code'))
        
        //    http://www.strava.com/oauth/token?client_id=113257&client_secret=34df2bc2346cd5376e854a968afa18fa5d35f851&code=a13bb2e68bc42f35b2917d578167c00eb55247eb&grant_type=authorization_code
        const response = await axios.post(`http://www.strava.com/oauth/token?client_id=113257&client_secret=34df2bc2346cd5376e854a968afa18fa5d35f851&code=${code}&grant_type=authorization_code`)

        const { access_token, refresh_token, expires_at, expires_in } = response.data;

        // create a web-hook subscription
        const webhookSubscription = await axios.post(`https://www.strava.com/api/v3/push_subscriptions?client_id=113257&client_secret=34df2bc2346cd5376e854a968afa18fa5d35f851&callback_url=https://starling-intense-barely.ngrok-free.app/api/activity/strava-realtime&verify_token=strava&aspect_type=activity`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
        
        const activitiesResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`)
        
        const { data } = activitiesResponse 

        const user = await UserModel.findByIdAndUpdate(_id, { access_token, refresh_token, expires_at, expires_in, appsConnected: 'Strava' })

        if(!user) throw createHttpError(StatusCodes.UNAUTHORIZED, Constants.loginToProceed)

        let activitiesDocument : ActivityInterface[] = []

        // const userChallenges = await UserChallengesModel.find({ 'user._id': user._id }) as UserChallengesInterface[]

        for (let activity of data) {
            // let start_date = new Date(activity.start_date_local) 
            // let startTime = `${start_date.getUTCHours()}:${start_date.getUTCMinutes()}:${start_date.getUTCSeconds()}`

            const redundantActivity = await ActivityModel.findOne({activityId: activity.id})

            if (!redundantActivity) {
                const userActivity = new ActivityModel({
                    athleteId: activity.athlete.id,
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
                    startDate: activity.start_date,   // start time can be calculated from date, and end time by subtracting moving time
                    status: 'approved',
                    app: 'strava'
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
        const _id = req.user as UserInterface

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
                console.log(activity.athlete.id)
                // let start_date = new Date(activity.start_date_local) 
                // let startTime = `${start_date.getUTCHours()}:${start_date.getUTCMinutes()}:${start_date.getUTCSeconds()}`

                const redundantActivity = await ActivityModel.findOne({activityId: activity.id})

                if (!redundantActivity) {
                    let userActivity = await ActivityModel.create({
                        athleteId: activity.athlete.id,
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
                        startDate: activity.start_date,   // start time can be calculated from date, and end time by subtracting moving time
                        status: 'approved',
                        app: 'strava'
                    })

                    userActivity.save();
                    
                    activitiesDocument.push(userActivity)
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
                console.log(activity.athlete.id)
                // let start_date = new Date(activity.start_date_local) 
                // let startTime = `${start_date.getUTCHours()}:${start_date.getUTCMinutes()}:${start_date.getUTCSeconds()}`

                const redundantActivity = await ActivityModel.findOne({activityId: activity.id})

                if (!redundantActivity) {
                    console.log(redundantActivity)
                    const userActivity = new ActivityModel({
                        activityId: activity.id,
                        athleteId: activity.athlete.id,
                        userId: _id,
                        activityType: activity.sport_type,
                        elapsedTime: activity.elapsed_time,
                        movingTime: activity.moving_time,
                        maximumSpeed: activity.max_speed,
                        averageSpeed: activity.average_speed,
                        caloriesBurnt: activity.calories,
                        distanceCovered: activity.distance,
                        totalAssent: activity.total_elevation_gain,
                        startDate: activity.start_date,   // start time can be calculated from date, and end time by subtracting moving time
                        status: 'approved',
                        app: 'strava'
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

export const getActivitiesByUser: RequestHandler<unknown, unknown, StravaInterface, unknown> = async(req, res, next) => {
    try {
        const _id = req.user as UserInterface;
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

export const postActivities: RequestHandler<unknown, unknown, { object_id: number, aspect_type: string, owner_id: number}, unknown> =async (req, res) => {
    const { object_id, aspect_type, owner_id } = req.body
    console.log('owner_id', owner_id)
    if(!owner_id) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.stravaServerError)

    const user = await UserModel.findOne({ athlete_id: owner_id })

    if(!user) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.userNotFound)

    if (aspect_type === 'create' && object_id) {

        axios.get(`https://www.strava.com/api/v3/activities/${object_id}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
            },
        })  
        .then(async (response) => {
            const activityData: any = response.data;
                // let start_date = new Date(activity.start_date_local) 
                // let startTime = `${start_date.getUTCHours()}:${start_date.getUTCMinutes()}:${start_date.getUTCSeconds()}`

                const redundantActivity = await ActivityModel.findOne({activityId: activityData.id})

                if (!redundantActivity) {
                    const userActivity = new ActivityModel({
                        activityId: activityData.id,
                        athleteId: activityData.athlete.id,
                        userId: user._id,
                        activityType: activityData.sport_type,
                        elapsedTime: activityData.elapsed_time,
                        movingTime: activityData.moving_time,
                        maximumSpeed: activityData.max_speed,
                        averageSpeed: activityData.average_speed,
                        caloriesBurnt: activityData.calories,
                        distanceCovered: activityData.distance,
                        totalAssent: activityData.total_elevation_gain,
                        startDate: activityData.start_date,   // start time can be calculated from date, and end time by subtracting moving time
                        status: 'approved',
                        app: 'strava'
                    })
                    
                    userActivity.save();

                    await UserModel.updateOne({ _id: user._id }, { $push: { 'activities': userActivity }})

                    const userChallenges = user.challenges

                    const activities = user.activities

                    if (userChallenges) 
                        updateLeaderboard(user, activities, userChallenges)
                    }
            
            // Handle the activity data as needed
        })
        .catch(error => {
            console.error('Error fetching activity:', error);
        });
    }
  }

export const getActivities: RequestHandler<unknown, unknown, unknown, {'hub.mode': string, 'hub.verify_token': string, 'hub.challenge': string}> =async (req, res) => {
// Your verify token. Should be a random string.

    const VERIFY_TOKEN = "strava";
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {     
            console.log('WEBHOOK_VERIFIED');
            res.json({"hub.challenge":challenge});  
        } else {
            res.sendStatus(403);      
        }
    }
}

export const uploadManualActivity: RequestHandler<unknown, unknown, ActivityInterface, unknown> =async (req, res, next) => { 
    try {
        const _id  = req.user as UserInterface

        const user = await UserModel.findById(_id)

        if(!user) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.userNotFound)

        const { activityType, elapsedTime, movingTime, maximumSpeed, averageSpeed, caloriesBurnt, distanceCovered, totalAssent, startDate   } = req.body
        
        const activity_id = parseInt(uuid(), 16) 

        const activity = await ActivityModel.create({
            activityId: activity_id,
            athleteId: user.athlete_id,
            userId: _id,
            activityType,
            elapsedTime,
            movingTime,
            maximumSpeed,
            averageSpeed,
            caloriesBurnt,
            distanceCovered,
            totalAssent,
            startDate,   // start time can be calculated from date, and end time by subtracting moving time
            status: 'underReview',
            app: 'manual'
        })

        res.status(StatusCodes.OK).json({
            success: true,
            data: activity,
            message: Constants.manualActivityCreatedSuccessfully
        })
    } catch (err: unknown) {
        if(err instanceof Error) {
            logger.error(err.message)
            next(err.message)
        }
    }
}


export const updateManualActivityStatus: RequestHandler<{ activityId: number }, unknown, ActivityInterface, unknown> =async (req, res, next) => {  
    try {
        const _id = req.user

        const user = await UserModel.findById(_id) as UserInterface

        const userChallenges = user.challenges
        
        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        const activityId = req.params

        const { status } = req.body

        await ActivityModel.findByIdAndUpdate({ _id: activityId }, { status })

        const activity = await ActivityModel.findById(_id) as ActivityInterface

        if(status === 'approved')  updateLeaderboard(user, [activity], userChallenges)

        res.status(StatusCodes.NO_CONTENT).json({
            success: true,
            data: [],
            message: Constants.updatedManualActivityStatus
        })

    } catch (err: unknown) {
        if(err instanceof Error) {
            logger.error(err.message)
            next(err.message)
        }
    }
}

