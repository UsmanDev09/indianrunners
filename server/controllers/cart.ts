import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { Cart } from "../interfaces/cart"
import { Response } from "../interfaces/response"
import CartModel from "../models/cart"
import UserModel from "../models/user"
import mongoose from "mongoose"
import { Constants } from "../utility/constants"
import logger from "../config/logger"
import { User } from "../interfaces/user"

export const addChalengeToCart: RequestHandler<unknown, Response, User, User> = async (req, res, next) => {
    try {
        const { _id } = req.user as User

        const user = await UserModel.findById(_id)

        if(!user) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

        const cart = await CartModel.create(req.body)        
 
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