import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"

import { Notification } from "../interfaces/notification"
import NotificationModel from "../models/notification"
import { Constants } from "../utility/constants"
import logger from "../config/logger"

export const createNotification: RequestHandler<unknown, unknown, Notification, unknown> = async (req, res, next) => {
    try {
        const notification = await NotificationModel.create(req.body)        
 
        res.status(StatusCodes.OK).json({
            success: true,
            data: notification,
            message: Constants.notificationCreatedSuccessfully
        })
    } catch(error) {
        logger.error(error)
        next(error)
    }
}

export const updateNotification: RequestHandler<unknown, unknown, Notification, unknown> = async (req, res, next) => {
    try {
        const { _id, read } = req.body        
 
        const notification = NotificationModel.findByIdAndUpdate(_id, { read })

        res.status(StatusCodes.OK).json({
            success: true,
            data: notification,
            message: Constants.notificationUpdatedSuccessfully
        })
    } catch(error) {
        logger.error(error)
        next(error)
    }
}

export const getAllNotifications: RequestHandler<unknown, unknown, Notification, unknown> = async (req, res, next) => { 
    try {
        const notifications = await NotificationModel.find()

        res.status(StatusCodes.OK).json({
            success: true,
            data: notifications,
            message: Constants.notificationsFetchedSuccessfully
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }

}
