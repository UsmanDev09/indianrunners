import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"

import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"
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

        const cart = user.cart
        if (!cart) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.cartIsEmpty)
        
        let userChallengesDetails

        // get itemdetails from cart 

        for (let cartItem of cart) {
            const { itemDetails } = cartItem
            for (let itemDetail of itemDetails) {
                const { challenge, challengeCategories } = itemDetail
                
                
                const userChallenges = await UserChallenges.findById(user._id)

                if(userChallenges) {
                    userChallengesDetails = await UserChallenges.updateOne({ _id: user._id }, { $push: { challenge }}  )
                } else {
                    userChallengesDetails = await UserChallenges.create({
                        user,
                        challenges: challenge,
                        paid: true
                    })
                }

                for (let category of challengeCategories){
                    const leaderboard = await LeaderboardModel.find( { challenge: challenge._id } )

                    if(!leaderboard) throw createHttpError(StatusCodes.NOT_FOUND, Constants.leaderboardNotFound)
                    
                    await LeaderboardModel.updateOne({ challenge: challenge._id, category: category._id }, { userDetails: { $push: { user: user._id, rank: 0 } } })

                    await NotificationModel.create({ type: 'challenge', message: `You have been added to ${challenge.name} in category ${category.name} `})
                }
            }
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

