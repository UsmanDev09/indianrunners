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
        if (!(name || criteria || description))
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.requiredParameters)

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
    const { _id } = req.user as User;

    if (!mongoose?.Types.ObjectId.isValid(_id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const badge = await BadgeModel.findById(_id)

    if(!badge) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    await BadgeModel.findByIdAndDelete(_id)

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
