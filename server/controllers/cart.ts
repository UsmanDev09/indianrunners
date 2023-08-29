import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { Cart, ChallengeType } from "../interfaces/cart"
import { Response } from "../interfaces/response"
import CartModel from "../models/cart"
import UserModel from "../models/user"
import ChallengeModel from "../models/challenge"
import ChallengeCategoryModel from "../models/challengeCategory"
import mongoose from "mongoose"
import { Document } from "mongoose"
import { Constants } from "../utility/constants"
import logger from "../config/logger"
import { User } from "../interfaces/user"
import { ChallengeCategory } from "../interfaces/challengeCategory"

export const addChallengeToCart: RequestHandler<unknown, unknown, Cart, unknown> = async (req, res, next) => {
    try {
        const { _id } = req.user as User

        const { itemType, itemDetails } = req.body
        console.log(itemType, itemDetails)
        const user = await UserModel.findById(_id)

        if(!user) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)
        
        const itemDetailDocuments : any = []

        for (const itemDetail of itemDetails ) {
            const challenge = await ChallengeModel.findById(itemDetails[0].challenge._id)
            const { challengeCategories } : any = itemDetail
            const challengeCategoryDocuments: any = []
            for (const challengeCategory of challengeCategories) {
                const challengeCategoryDocument = await ChallengeCategoryModel.findById(challengeCategory._id)
                challengeCategoryDocuments.push(challengeCategoryDocument)
            }
            itemDetailDocuments.push({
                challenge, 
                challengeCategories: challengeCategoryDocuments
            })
            
        }

        const cart = await CartModel.create({
            itemType, 
            itemDetails: itemDetailDocuments
        })

        user.cart.push(cart)

        await user.save()

        res.status(StatusCodes.OK).json({
            success: true,
            data: cart,
            message: Constants.cartCreatedSuccessfully
        })
    } catch(error) {
        logger.error(error)
        next(error)
    }
}


export const updateCart: RequestHandler<{ id: number }, unknown, Cart, Cart> = async (req, res, next) => { 
    try {

        const { _id } = req.user as User
    
        const user = await UserModel.findById(_id)

        if(!user) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

        const { id } = req?.params

        const updatedCart = await CartModel.findByIdAndUpdate(id, req.body)
        
        
        user.cart.push([updatedCart])
        
        await user.save()
        
        res.status(StatusCodes.OK).json({
            success: true,
            data: updatedCart,
            message: Constants.cartUpdatedSuccessfully
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getCart: RequestHandler<unknown, unknown, Cart, unknown> = async (req, res, next) => { 
    const { _id } = req.user as User;

    if (!mongoose?.Types.ObjectId.isValid(_id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const user = await UserModel.findById(_id)

    if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    res.status(StatusCodes.OK).json({
        success: true,
        data: user.cart,
        message: Constants.cartFetchedSuccessfully
    })

}