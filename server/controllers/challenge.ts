import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"

import { Challenge as ChallengeInterface } from "../models/challenge"
import DesignStateModel from '../models/designState'
import ChallengeModel from "../models/challenge"
import CategoryModel, { Category as ChallengeCategoryInterface } from "../models/challengeCategory"
import LeaderboardModel from "../models/leaderboard"
import { Constants } from "../utility/constants"
import logger from "../config/logger"
import UserModel, { User as UserInterface } from "../models/user"

export const createChallenge: RequestHandler<unknown, unknown, ChallengeInterface, unknown> = async (req, res, next) => {
    
    try {
        const { type, name, activity, knockout, knockoutType, lowerLimit, upperLimit, fixedLimit, cutOffDays, cutOffHours, startDate, endDate, tags, price, bibNumber, featured, verified, organizationName, categories } = req?.body
        let result: any;

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
        
        let categoryDocument: any = []

        if (categories) {
            for (let category of categories) {
                const categoryRecord = await CategoryModel.findById(category)
                categoryDocument.push(categoryRecord)
            }
        }

        const challenge = await ChallengeModel.create(
            { 
              type, name, activity, knockout, knockoutType, lowerLimit, upperLimit, fixedLimit, 
              cutOffDays, cutOffHours, price, startDate, endDate, tags, bibNumber, featured, 
              verified, organizationName, categories: categoryDocument, image: result?.secure_url
            }
        )        
    
        const challenges = await ChallengeModel.find()

        const challengeCategories = challenge.categories

        const challengeCategoriesPromises = challengeCategories.map(async (category) => {
            return LeaderboardModel.create({
              category,
              challenge,
            });
          });
          
        await Promise.all(challengeCategoriesPromises);
        
        res.status(StatusCodes.OK).json({
            success: true,
            data: challenges,
            message: Constants.challengeCreatedSuccessfully
        })

    } catch(error) {
        if(error instanceof Error) {
            logger.error(error.message)
            next(error.message)
        }
    }
}

export const addCertificateToChallenge: RequestHandler<unknown, unknown, { challengeId: number, certificateUrl: string, designState: object }, unknown> = async (req, res, next) => {
    try {
        const _id = req.user as UserInterface 

        const { challengeId, certificateUrl, designState } = req.body
    
        const designStateDocument = await DesignStateModel.create(designState)

        const challenge = await ChallengeModel.findByIdAndUpdate(challengeId, { $push: { certificates: certificateUrl, designState: designStateDocument._id } })

        res.status(StatusCodes.OK).json({
            success: true,
            data: challenge,
            message: Constants.certificateAddedToChallenges
        })

    } catch (err) {
        if(err instanceof Error) {
            logger.error(err.message)
            next(err.message)
        }
    }  
}

export const getCertificatesByChallenge: RequestHandler<{ challengeId: number }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { challengeId } = req.params

        const challenge = await ChallengeModel.findById(challengeId).populate('designState').exec()

        res.status(StatusCodes.OK).json({
            success: true,
            data: challenge,
            message: Constants.certificatesFetchedSuccessfully
        })

    } catch (err) {
        if(err instanceof Error) {
            console.log(err.message)
            logger.error(err.message)
            next(err.message)
        }
    }
}

// logic not completed
export const updateChallenge: RequestHandler<unknown, unknown, ChallengeInterface, unknown> = async (req, res, next) => { 
    try {
        const _id = req.user as number;
    
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
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message)
            next(err.message)
        }
    }

}

export const deleteChallenge: RequestHandler< { id:number }, unknown, ChallengeInterface, unknown> = async (req, res, next) => { 
    try {
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
    } catch (err) {
        if(err instanceof Error) {
            logger.error(err.message)
            next(err.message)
        }
    }

}

export const getAllChallenges: RequestHandler<unknown, unknown, ChallengeInterface, any> = async (req, res, next) => { 
    try {
        interface PriceFilter {
            $gte?: number;
            $lte?: number;
        }

        const { name, type, activity, knockout, knockoutType, sport, featured, verified, minPrice, maxPrice, page, pageSize } = req.query
        

        const filters: { [key: string]: RegExp | boolean | PriceFilter  } = {}; 
        const sort: { [key: string]: 'asc' | 'desc' } = {}; 

        if (type) 
            filters.type = new RegExp(type, 'i') 

        if (activity)
            filters.activity = new RegExp(activity, 'i')

        if (knockout) 
            filters.knockout = knockout

        if (knockoutType)
            filters.knockoutType = new RegExp(knockoutType, 'i')
        
        if (sport)
            filters.sport = new RegExp(sport, 'i')

        if (featured)
            filters.featured = featured

        if (verified)
            filters.verified = verified

        if (minPrice && !isNaN(minPrice)) 
        filters.price = { $gte: minPrice }

        if (maxPrice && !isNaN(maxPrice)) {
            filters.price = { $lte: maxPrice };
        }

        if (name === 'asc' || name === 'desc')
            sort.name = name

        const challenges = await ChallengeModel.find(filters).sort(sort).skip((page - 1) * pageSize)
        .limit(pageSize);

        res.status(StatusCodes.OK).json({
            success: true,
            data: challenges,
            message: Constants.challengesFetchedSuccessfully
        })
    } catch (err) {
        if(err instanceof Error){
            logger.error(err.message)
            next(err.message)
        }
    }

}

export const getUsersCertificateStatus: RequestHandler<unknown, unknown, ChallengeInterface, unknown> = async (req, res, next) => { 
    try {
        const _id = req.params 

        const challenge = await ChallengeModel.findById(_id) 
    
        const challengeCertificatesStatus = challenge?.userDetails
    
        res.status(StatusCodes.OK).json({
            success: true,
            data: challengeCertificatesStatus,
            message: Constants.challengeCertificatesStatusFetchedSuccessfully
        })
    } catch (err) {
        if(err instanceof Error){
            logger.error(err.message)
            next(err.message)
        }
    }
}

export const assignCertificateToAUser: RequestHandler<unknown, unknown, ChallengeInterface, unknown> = async (req, res, next) => {
    try {
        const userId = req.params

        const challengeId = req.params

        const challenge = await ChallengeModel.findById(challengeId) 

        if(!challenge) throw createHttpError(StatusCodes.NOT_FOUND ,Constants.challengeNotFound)

        await ChallengeModel.findOneAndUpdate({ _id: challengeId, userDetails: { user: userId } }, { certificatesSent: true }) 

        const user = await UserModel.findByIdAndUpdate(userId, { $push: { certicates: challenge.certificate } })
        
        res.status(StatusCodes.NO_CONTENT).json({
            success: true,
            data: [],
            message: Constants.certificateAssignedSuccessfully
        })

        
    } catch (err) {
        if(err instanceof Error){ 
            logger.error(err.message)
            next(err.message)
        }
    }
}

export const getChallengeById: RequestHandler<{ id: number }, unknown, ChallengeInterface, ChallengeInterface> = async (req, res, next) => { 
    try {
        const { id } = req.params

        const challenge = await ChallengeModel.findById(id)

        if (!challenge) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.challengeNotFound)

        res.status(StatusCodes.OK).json({
            success: true,
            data: challenge,
            message: Constants.challengesFetchedSuccessfully
        })
    } catch (err) {
        if(err instanceof Error){ 
            logger.error(err.message)
            next(err.message)
        }
    }
}