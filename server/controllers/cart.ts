import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { Cart } from "../interfaces/cart"
import CartModel from "../models/cart"
import UserModel from "../models/user"
import ChallengeModel from "../models/challenge"
import ChallengeCategoryModel from "../models/challengeCategory"
import mongoose from "mongoose"
import { Constants } from "../utility/constants"
import logger from "../config/logger"
import { User } from "../interfaces/user"

export const addChallengeToCart: RequestHandler<unknown, unknown, Cart, unknown> = async (req, res, next) => {
    try {
        const { _id } = req.user as User

        const { itemType, itemDetails } = req.body

        const user = await UserModel.findById(_id)
        if(!user) 
        throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)
        
        const itemDetailDocuments : any = []


        // check if the category exists in challenge then push 
        
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
                console.log(user)

        const cart = await CartModel.create({
            itemType, 
            itemDetails: itemDetailDocuments
        })

        console.log(user.cart)

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


export const removeChallengeFromCart: RequestHandler<{ id: number }, unknown, Cart, unknown> = async (req, res, next) => { 
    try {

        const { _id } = req.user as User
        
        const { itemDetails } = req.body

        const cartId = req.body._id

        const user = await UserModel.findById(_id)

        if(!user) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

        if( user.cart.length === 0)
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

        const deletecart = await CartModel.findByIdAndDelete(cartId)
        
        const challenge = await UserModel.updateOne({_id: user._id, 'cart.itemDetails.challenge._id': itemDetails[0].challenge._id}, { $pull: {'cart.$.itemDetails': {'challenge._id' : itemDetails[0].challenge._id}}})

        // check if itemDetails is empty and remove the object
        await UserModel.updateOne(
            { _id: user._id, 'cart.itemDetails': { $size: 0 } }, { $pull: { cart: { 'itemDetails': { $size: 0 } } } }
        );
             
        res.status(StatusCodes.OK).json({
            success: true,
            data: challenge,
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