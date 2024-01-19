import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"

import { productCategory } from "../interfaces/productCategory"
import ShippingDetailsModel from "../models/shippingDetail"
import UserModel from "../models/user"
import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"
import logger from "../config/logger"

export const addShippingDetailsToUser: RequestHandler<unknown, unknown, productCategory, unknown> = async (req, res, next) => {
    try {
        const _id = req.user as User;

        const shippingDetails = await ShippingDetailsModel.create(req.body)
        
        const user = await UserModel.findById(_id)
        
        if(!user) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)
        
        user.shippingDetail = shippingDetails

        await user.save()
        
        res.status(StatusCodes.OK).json({
            success: true,
            data: shippingDetails,
            message: Constants.shippingDetailsAddedSuccessfully
        })
    } catch(error) {
        logger.error(error)
        next(error)
    }
}
