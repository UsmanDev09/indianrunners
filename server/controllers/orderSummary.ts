import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"

import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"
import { Response } from "../interfaces/response"
import { OrderSummary } from "../interfaces/orderSummary"

export const getOrderSummary: RequestHandler<unknown, unknown, User, unknown> = async (req, res, next) => {
     try {
        
        const user = req.user as User
        
        const cart = user.cart

        const shippingDetails = user.shippingDetails
 
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
        next(error)
    }
}

