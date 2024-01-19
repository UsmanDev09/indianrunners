import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

import { Constants } from "../utility/constants"
import UserModel from "../models/user"
import { User } from "../interfaces/user"
import { OrderSummary } from "../interfaces/orderSummary"
import logger from "../config/logger"
import createHttpError from "http-errors"
import { Cart } from "../interfaces/cart"

export const getOrderSummary: RequestHandler<unknown, unknown, OrderSummary, unknown> = async (req, res, next) => {
     try {
        
        const userId = req.user as User
        
        const user = await UserModel.findById(userId)

        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)


        const cart = user.cart as any

        const shippingDetails = user.shippingDetail
 
        const orderDetails: OrderSummary = {
            cart, 
            shippingDetails
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: orderDetails,
            message: Constants.orderDetailsFetchedSuccessfully
        })
    } catch(error) {
        logger.error(error)
        next(error)
    }
}

