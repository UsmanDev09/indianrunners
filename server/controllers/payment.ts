import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { Queue, Worker } from 'bullmq';
import { Types } from 'mongoose'
// import { postReq } from "../ccAvenue/ccavRequestHandler"
import { Constants } from "../utility/constants"
import { User as UserInterface } from "../models/user"
import ProductModel from '../models/product'
import UserModel from '../models/user'
import InventoryModel from '../models/inventory'
import challengeModel from '../models/challenge'
import logger from "../config/logger"
import { findChallenge } from "../services/challenge";
import { createUserChallenge, findUserChallengeByUserId, updateUserChallengeByUserId } from "../services/userChallenges";
import { addChallengesToUserProfile } from "../services/user";
import { addUserToLeaderboard, findLeaderboardByChallenge } from "../services/leaderboard";
import { createNotification } from "../services/notification";
import mongoose from "mongoose";

export const initiatePayment: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
     try {
        const _id = req.user as Types.ObjectId

        const user = await UserModel.findById(_id)

        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        const cart = user.cart 

        if (!cart) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.cartIsEmpty)
        
        let rewardPoints = 0, totalPrice = 0, userChallengesDetails
        // get itemdetails from cart 
        for (let cartItem of cart) {
            
            const { itemDetails, itemType } = cartItem

            if(itemType === 'product') {
                for (let itemDetail of itemDetails) {
                    const { product, productQuantity } = itemDetail
                    let productDocument, challengeDocument: any
                    
                    if(product)
                        productDocument = await ProductModel.findById(product)
                    
                    if(productDocument) {
                        rewardPoints = (productDocument.rewardPoints || 0) + rewardPoints
                        totalPrice = (productDocument.price || 0) * (productQuantity || 0) + totalPrice
                    }
                    
                    if(productDocument && productQuantity)
                        await InventoryModel.updateOne({ product: new mongoose.Types.ObjectId(productDocument._id) }, { $inc: { 'details.quantity': -productQuantity } })
                }    
            }

            if(itemType==='challenge'){
                for (let itemDetail of itemDetails) {
                    const { challenge, challengeCategories } = itemDetail
                    let challengeDocument: any

                    if (challenge) 
                        challengeDocument = await findChallenge(challenge) // change any
                    
                    if (!challengeDocument) throw createHttpError(StatusCodes.NOT_FOUND, Constants.challengeNotFound)
                    // adds user to challenges
                
                    if (!challengeDocument.users && challenge) {
                        await challengeModel.findByIdAndUpdate(challenge._id, { $push: {users: user._id }})
                    } else if(challengeDocument && challenge) {
                        await challengeModel.findByIdAndUpdate(challenge._id, { $push: { users: user._id} })
                    }

                    
                    // adds details of user's challenges and payment status. Also, add categories in challenges
                    const userChallenges = await findUserChallengeByUserId(user)
                    if (userChallenges) {
                        userChallengesDetails = await updateUserChallengeByUserId(user, challengeDocument)
                    } else {
                        userChallengesDetails = await createUserChallenge(user, challengeDocument)
                    }
                    
                    const updateUserProfile = await addChallengesToUserProfile(user, challengeDocument)
                    
                    // adds user to leaderboard and notifies
                    for (let category of challengeCategories) {
                        const leaderboard = await findLeaderboardByChallenge(challengeDocument)
    
                        totalPrice = Number(challengeDocument.price || 0) + Number(totalPrice)
    
                        if(!leaderboard) throw createHttpError(StatusCodes.NOT_FOUND, Constants.leaderboardNotFound)
                        
                        if (!category) throw createHttpError(StatusCodes.BAD_GATEWAY, Constants.categoryNotFound)
                        
                        await addUserToLeaderboard(challengeDocument, category, user)

                        const type = 'challenge'
                        
                        const message = `You have been added to ${challengeDocument.name}`
    
                        await createNotification(type, message)
                    
    
                        // empty cart 
                }
            }
            }

            
        
        // uncomment it when integrating ccaveneue  
        // const response = postReq(req, res)
        // console.log(response)
    }
    console.log('TOTAL PRICE', totalPrice)
    await UserModel.findByIdAndUpdate(user, { rewardPoints })

    res.status(StatusCodes.OK).json({
        success: true,
        message: Constants.orderCreatedSuccessfully
    })
    } catch(error: unknown) {
        if(error instanceof Error) {
            logger.error(error.message)
            next(error.message)
        }
    }
}

