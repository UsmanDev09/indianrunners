import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"

import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"
import UserModel from "../models/user"
import ChallengeModel from "../models/challenge"
// import { postReq } from "../ccAvenue/ccavRequestHandler"
import { Challenge } from "../interfaces/challenge"
import UserChallenges from "../models/userChallenges"
import NotificationModel from "../models/notification"
import logger from "../config/logger"
import LeaderboardModel from "../models/leaderboard"
import { UserChallengesInterface } from "../interfaces/userChallenges"

export const initiatePayment: RequestHandler<unknown, unknown, UserChallengesInterface, unknown> = async (req, res, next) => {
     try {

        const user = req.user as User

        const { challenges } = req.body

        const userExists = await UserModel.findById(user._id)

        if(!userExists) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)
        
        
        let userChallengesDetails; 

        for(let challenge of challenges) {
            console.log(challenge._id)
            const challengeExists = await ChallengeModel.findById(challenge._id)
            
            if(!challengeExists) throw createHttpError(StatusCodes.NOT_FOUND, Constants.challengeNotFound)
            
            const categories = challengeExists.categories
            console.log(challengeExists)
            for (let category of categories){
                const leaderboard = await LeaderboardModel.find({ challenge: challengeExists })
                
                if(!leaderboard) throw createHttpError(StatusCodes.NOT_FOUND, Constants.leaderboardNotFound)
                
                await LeaderboardModel.findOneAndUpdate({ challenge: challenge._id, category: category._id }, { user, rank: 0 })

                await NotificationModel.create({ type: 'challenge', message: `You have been added to ${challenge.name} in category ${category.name} `})
            }
        }
        const userChallenges = await UserChallenges.findById(user._id)
        
        // if(!userChallenges) throw createHttpError(StatusCodes.NOT_FOUND, Constants.challengeNotFound)
        
        // let challengesExits = userChallenges?.challenges.length > 0

        if(!userChallenges || !(userChallenges.challenges.length > 0)) {
            userChallengesDetails = await UserChallenges.updateOne({ _id: user._id }, { $push: { challenge: challenges }}  )
        } else {
            userChallengesDetails = await UserChallenges.create({
                user,
                challenges,
                paid: true
            })
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: userChallengesDetails,
            message: Constants.orderCreatedSuccessfully
        })

        // uncomment it when integrating ccaveneue  
        // const response = postReq(req, res)
        // console.log(response)
    } catch(error) {
        logger.error(error)
        next(error)
    }
}

