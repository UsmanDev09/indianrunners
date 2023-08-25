import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"

import { Badge } from "../interfaces/badge"
import BadgeModel from "../models/badge"
import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"

export const createBadge: RequestHandler<unknown, unknown, Badge, unknown> = async (req, res, next) => {
    const { name, description, criteria } = req?.body
 
    try {
        const badge = await BadgeModel.create(req.body)        
 
        res.status(StatusCodes.OK).json({
            success: true,
            data: badge,
            message: Constants.badgeCreatedSuccessfully
        })
    } catch(error) {
        next(error)
    }
}


export const deleteBadge: RequestHandler<unknown, unknown, Badge, unknown> = async (req, res, next) => { 
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

}

export const getAllBadges: RequestHandler<unknown, unknown, Badge, unknown> = async (req, res, next) => { 

    const badges = await BadgeModel.find()

    res.status(StatusCodes.OK).json({
        success: true,
        data: badges,
        message: Constants.badgesFetchedSuccessfully
    })

}
