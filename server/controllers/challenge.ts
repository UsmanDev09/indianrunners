import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"

import { Challenge } from "../interfaces/challenge"
import { Response, Responses } from "../interfaces/response"
import ChallengeModel from "../models/challenge"
import CategoryModel from "../models/challengeCategory"
import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"

export const createChallenge: RequestHandler<unknown, Response, Challenge, unknown> = async (req, res, next) => {
    try {
        const { type, name, activity, knockout, knockoutType, lowerLimit, upperLimit, fixedLimit, cutOffDays, cutOffHours, image, startDate, endDate, tags, price, bibNumber, featured, verified, organizationName, categories } = req?.body
        
        if (type === 'open' && lowerLimit === undefined)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.openChallengesShouldHaveLowerLimit) 
    
        if (type === 'open' && (upperLimit || fixedLimit) )
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.openChallengesWrongOptions)

        if (type === 'fixed' && (upperLimit === undefined || fixedLimit === undefined))
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.fixedChallengesShouldHaveUpperLimitAndFixedLimit) 

        if (type === 'fixed' && (lowerLimit))
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.fixedChallengesWrongOptions)

        if (activity === 'single' && categories?.length !== 1)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.singleCategoryShouldBeProvided)

        if (activity === 'multiple' && categories?.length < 2)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.multipleCategoriesShouldBeProvided)

        if (knockout && knockoutType === undefined) 
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.knockoutTypeShouldBeProvided)

        if (!knockout && (cutOffDays || cutOffHours))
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.challengesWrongOptions)
        
        if (knockoutType === 'hourly' && cutOffHours === undefined)  
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.hourlyKnockoutChallengesMustHaveCutOffHours)

        if (knockoutType === 'daily' && cutOffDays === undefined)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.dailyKnockoutChallengesMustHaveCutOffDays)

        const challenge = await ChallengeModel.create(
            { 
              type, name, activity, knockout, knockoutType, lowerLimit, upperLimit, fixedLimit, 
              cutOffDays, cutOffHours,price, image, startDate, endDate, tags, bibNumber, featured, 
              verified, organizationName 
            }
        )        

        if(categories) {
            categories.map(async (category: number) => {
                const categoryRecord = await CategoryModel.findById((category))
                challenge.categories.push([categoryRecord])
            })
        }

        await challenge.save()
        
        res.status(StatusCodes.OK).json({
            success: true,
            data: challenge,
            message: Constants.challengeCreatedSuccessfully
        })
    } catch(error) {
        next(error)
    }
}

// logic not completed
export const updateChallenge: RequestHandler<unknown, unknown, Challenge, unknown> = async (req, res, next) => { 
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

export const deleteChallenge: RequestHandler< { id:number }, unknown, Challenge, unknown> = async (req, res, next) => { 
    
    const { id } = req.params;

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

export const getAllChallenges: RequestHandler<unknown, Responses, Challenge, Challenge> = async (req, res, next) => { 

    const challenges = await ChallengeModel.find()

    res.status(StatusCodes.OK).json({
        success: true,
        data: challenges,
        message: Constants.challengesFetchedSuccessfully
    })

}

export const getChallenge: RequestHandler<{ id: number }, Response, Challenge, Challenge> = async (req, res, next) => { 
    const { id } = req.params;

    const challenge = await ChallengeModel.findById(id)

    if (!challenge) 
        throw createHttpError(StatusCodes.NOT_FOUND, Constants.challengeNotFound)

    res.status(StatusCodes.OK).json({
        success: true,
        data: challenge,
        message: Constants.challengesFetchedSuccessfully
    })
}