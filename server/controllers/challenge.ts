import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { Challenge } from "../interfaces/challenge"
import ChallengeModel from "../models/challenge"
import CategoryModel from "../models/challengeCategory"
import mongoose from "mongoose"
import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"

export const createChallenge: RequestHandler<unknown, unknown, Challenge, unknown> = async (req, res, next) => {
    try {
        const { type, name, activity, knockout, knockoutType, lowerLimit, upperLimit, fixedLimit, cutOffDays, cutOffHours, image, startDate, endDate, logic, sport, tags, bibNumber, featured, verified, organizationName, categoryId } = req?.body

        const category = await CategoryModel.findById(categoryId)

        const challenge = await ChallengeModel.create(req.body)        
 
        challenge.categories.push([category])

        res.status(StatusCodes.OK).json({
            success: true,
            data: challenge,
            message: Constants.challengeCreatedSuccessfully
        })
    } catch(error) {
        next(error)
    }
}


export const updateChallenge: RequestHandler<unknown, unknown, Challenge, unknown> = async (req, res, next) => { 
    const { type, name, image, startDate, endDate, logic, sport, tags, bibNumber, featured, verified, organizationName } = req?.body
    const { _id } = req.user as User;
    
    if (!mongoose?.Types.ObjectId.isValid(_id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const challenge = ChallengeModel.findById(_id)

    if(!challenge) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    const updatedChallenge = await ChallengeModel.findByIdAndUpdate(_id, req.body)

    res.status(StatusCodes.OK).json({
        success: true,
        data: updatedChallenge,
        message: Constants.challengeUpdatedSuccessfully
    })

}

export const deleteChallenge: RequestHandler<unknown, unknown, Challenge, unknown> = async (req, res, next) => { 
    const { id } = req.body;

    if (!mongoose?.Types.ObjectId.isValid(id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const challenge = await ChallengeModel.findById(id)

    if(!challenge) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    await ChallengeModel.findByIdAndDelete(id)

    res.status(StatusCodes.OK).json({
        success: true,
        data: [],
        message: Constants.challengeDeletedSuccessfully
    })

}

export const getAllChallenges: RequestHandler<unknown, unknown, Challenge, unknown> = async (req, res, next) => { 

    const challenges = await ChallengeModel.find()

    res.status(StatusCodes.OK).json({
        success: true,
        data: challenges,
        message: Constants.challengesFetchedSuccessfully
    })

}
