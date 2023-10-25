import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { Cart } from "../interfaces/cart"
import CartModel from "../models/cart"
import UserModel from "../models/user"
import ProductModel from '../models/product'
import InventoryModel from '../models/inventory'
import ChallengeModel, { Challenge } from "../models/challenge"
import ChallengeCategoryModel from "../models/challengeCategory"
import mongoose, { Types } from "mongoose"
import { Constants } from "../utility/constants"
import logger from "../config/logger"
import { User } from "../interfaces/user"
import { Category as ChallengeCategory } from "../models/challengeCategory"

export const addChallengeToCart: RequestHandler<unknown, unknown, Cart, unknown> = async (req, res, next) => {
    try {
        const _id = req.user as User

        const { itemType, itemDetails } = req.body

        if (itemType !== 'challenge') throw createHttpError(StatusCodes.BAD_REQUEST, Constants.itemTypeIsWrong)

        const user = await UserModel.findById(_id)

        if(!user) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        const userCart = user.cart as any

        const mongoose = require('mongoose'); // Import Mongoose if you haven't already

        // Assuming challengeIdToCheck and categoryIdToCheck are numbers from req.body

        const isChallengeAndCategoryPresent = user.cart.some(cartItem => {
            let itemDetailsObj = itemDetails as any
            return (

                cartItem.itemDetails.some(itemDetail => {
                    // Convert ObjectID to a number for comparison
                    let itemDetailObject = itemDetail as any
                    const challengeIdInCart = new mongoose.Types.ObjectId(itemDetailObject.challenge && itemDetailObject.challenge._id);
                    const categoryIdInCart = new mongoose.Types.ObjectId(itemDetailObject.challengeCategories && itemDetailObject.challengeCategories[0]._id);
                   console.log(categoryIdInCart, itemDetailsObj[0].challengeCategories[0]._id)
                    return (
                        challengeIdInCart.equals(new mongoose.Types.ObjectId(itemDetailsObj[0].challenge._id)) &&
                        categoryIdInCart.equals(new mongoose.Types.ObjectId(itemDetailsObj[0].challengeCategories[0]._id))
                    );
                })
            );
        });

        if (isChallengeAndCategoryPresent) {
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.challengeAndCategoryAlreadyExistsInCart);
        }

        
                
        const itemDetailPromises = itemDetails.map(async (itemDetail) => {
            const challenge = await ChallengeModel.findById(itemDetail.challenge._id)
            
            if (!challenge) throw createHttpError(StatusCodes.NOT_FOUND, Constants.challengeNotFound) 

            
            const { challengeCategories } : any = itemDetail
            const categories: string[] = challenge.categories.map(category => category._id.toHexString());
        
            // check if the categories selected by user exists in challenge

            challengeCategories.forEach((category: any) => {
                const _id = new Types.ObjectId(category._id).toHexString()
                if(!categories.includes(_id)) throw createHttpError(StatusCodes.NOT_FOUND, Constants.selectedCategoryDoesNotExitsInChallenge(category._id))
            })

            const challengeCategoriesPromises = challengeCategories.map(async (challengeCategory: any) => {
                return await ChallengeCategoryModel.findById(challengeCategory._id)
            })
            
            const challengeCategoryDocuments = await Promise.all(challengeCategoriesPromises)

            return {
                challenge, 
                challengeCategories: challengeCategoryDocuments
            }

        })

        const itemDetailDocuments = await Promise.all(itemDetailPromises)    

        // check if challenge already exists in cart


        const cart = await CartModel.create({
            itemType, 
            itemDetails: itemDetailDocuments
        })

        user.cart.push(cart)
        
        await user.save()

        res.status(StatusCodes.OK).json({
            success: true,
            data: cart,
            message: Constants.challengeAddedToCartSuccessfully
        })
    } catch(error) {
        if(error instanceof Error) {
            logger.error(error.message)
            next(error.message)
        } else {
            next(error)
        }
    }
}

export const removeChallengeFromCart: RequestHandler<{ id: number }, unknown, Cart, unknown> = async (req, res, next) => { 
    try {
        console.log(req.body._id)
        const _id = req.user as User
        
        const { itemDetails } = req.body

        const cartId = req.body._id

        if(!cartId) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.cartNotFound)

        const user = await UserModel.findById(_id)

        if(!user) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        if( user.cart.length === 0)
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

        const deletecart = await CartModel.findByIdAndDelete(cartId)
        
        const challenge = await UserModel.updateOne({_id: user._id, 'cart.itemDetails.challenge._id': itemDetails[0].challenge._id}, { $pull: {'cart.$.itemDetails': {'challenge._id' : itemDetails[0].challenge._id}}})

        // check if itemDetails is empty and remove the object
        await UserModel.updateOne(
            { _id: user._id, 'cart.itemDetails': { $size: 0 } }, { $pull: { cart: { 'itemDetails': { $size: 0 } } } }
        );
        
        const cart = user.cart 

        res.status(StatusCodes.OK).json({
            success: true,
            data: cart,
            message: Constants.challengeRemovedFromCartSuccessfully
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const addProductToCart: RequestHandler<unknown, unknown, Cart, unknown> = async (req, res, next) => {
    try {
        const _id = req.user as User

        const { itemType, itemDetails } = req.body

        if (itemType !== 'product') throw createHttpError(StatusCodes.BAD_REQUEST, Constants.itemTypeIsWrong)

        const user = await UserModel.findById(_id)
        
        if(!user) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)
        
        let productDocument, cart

        for (const itemDetail of itemDetails ) {
            
            const { product, productQuantity } = itemDetail 
            
            if(!productQuantity) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.productQuantityIsMissing)

            productDocument = await ProductModel.findById(product)

            if (!product) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.cartIsEmpty)

            const inventory = await InventoryModel.findOne({product: new mongoose.Types.ObjectId(product._id)})

            if(!inventory) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.inventoryDoesNotExist)

            if(inventory.details?.quantity && inventory.details.quantity < Number(productQuantity) ) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.productIsOutOfStock)

            await InventoryModel.updateOne({ product: new mongoose.Types.ObjectId(product._id) }, { $inc: { 'details.quantity': -productQuantity } })
            
            cart = await CartModel.create({
                itemType,
                itemDetails: {
                    product: productDocument,
                    productQuantity: productQuantity,
                }
            })
            
            user.cart.push(cart)
            
            await user.save()
        }



        res.status(StatusCodes.OK).json({
            success: true,
            data: cart,
            message: Constants.productAddedToCartSuccessfully
        })
    } catch(error) {
        logger.error(error)
        next(error)
    }
}

export const removeProductFromCart: RequestHandler<{ id: number }, unknown, Cart, unknown> = async (req, res, next) => { 
    try {

        const _id = req.user as User
        
        const { itemDetails } = req.body

        const cartId = req.body._id

        const user = await UserModel.findById(_id)

        if(!user) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

        if(user.cart.length === 0)
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.cartIsEmpty)
        
        await UserModel.updateOne({_id: user._id, 'cart.itemDetails.product._id': itemDetails[0].product}, { $pull: {'cart.$.itemDetails': {'product._id' : itemDetails[0].product}}})

        // check if itemDetails is empty and remove the object
        await UserModel.updateOne(
            { _id: user._id, 'cart.itemDetails': { $size: 0 } }, { $pull: { cart: { 'itemDetails': { $size: 0 } } } }
        );
             
        res.status(StatusCodes.OK).json({
            success: true,
            data: user.cart,
            message: Constants.productRemovedFromCartSuccessfully
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getCart: RequestHandler<unknown, unknown, Cart, unknown> = async (req, res, next) => { 
    const _id = req.user as number

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