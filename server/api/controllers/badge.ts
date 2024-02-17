import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import { v2 as cloudinary } from 'cloudinary'
import { uuid } from 'uuidv4'
import { Badge } from "../interfaces/badge"
import BadgeModel from "../models/badge"
import { Constants } from "../utility/constants"
import logger from "../config/logger"
import { uploadImageToCloudinary } from '../helpers/helper'

export const createBadge: RequestHandler<unknown, unknown, Badge, unknown> = async (req, res, next) => {
    let result;
    
    try {
        
        if(req.file) {
            result = await uploadImageToCloudinary(req.file, 'badge')         
        }

        const badge = await BadgeModel.create({ ...req.body, image: result?.secure_url })        
 
        res.status(StatusCodes.OK).json({
            success: true,
            data: badge,
            message: Constants.badgeCreatedSuccessfully
        })
    } catch(error) {
        logger.error(error)
        next(error)
    }
}


export const deleteBadge: RequestHandler<unknown, unknown, Badge, unknown> = async (req, res, next) => { 
    try {
        const { id } = req.body;
        
        if (!mongoose?.Types.ObjectId.isValid(id)) {
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
        }

        const badge = await BadgeModel.findById(id)

        if(!badge) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

        await BadgeModel.findByIdAndDelete(id)

        res.status(StatusCodes.OK).json({
            success: true,
            data: [],
            message: Constants.badgeDeletedSuccessfully
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }

}

export const getAllBadges: RequestHandler<unknown, unknown, Badge, unknown> = async (req, res, next) => { 
    try {
        const badges = await BadgeModel.find()

        res.status(StatusCodes.OK).json({
            success: true,
            data: badges,
            message: Constants.badgesFetchedSuccessfully
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }

}
