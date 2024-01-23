import { RequestHandler } from "express"
import { payment } from "../utility/razorPay"
import { StatusCodes } from "http-status-codes"
import { Constants } from "../utility/constants"
import OrderModel from '../models/order'
import ProductModel from '../models/product'
import UserModel from '../models/user'
import createHttpError from "http-errors"


export const createCheckout: RequestHandler<unknown, unknown, { totalPrice: number }, unknown> = async (req, res, next) => {
    try {

        let totalPrice = 0

        const _id = req.user as number;
        
        const user = await UserModel.findById(_id)

        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        const cart = user.cart 
        
        let order

        for (let cartItem of cart) {
            
            const { itemDetails, itemType } = cartItem

            if(itemType === 'product') {
                for (let itemDetail of itemDetails) {
                    const { product, productQuantity } = itemDetail
                    let productDocument, challengeDocument: any
                    
                    if(product)
                        productDocument = await ProductModel.findById(product)
                    
                    if(productDocument) {
                        console.log(productDocument.price)

                        totalPrice = (productDocument.price || 0) * (productQuantity || 0) + totalPrice
                    }
                    
                }    
            }

            if(itemType==='challenge'){
                for (let itemDetail of itemDetails) {
                    const { challenge, challengeCategories } = itemDetail
                    let challengeDocument: any
                    for (let category of challengeCategories) {
    
                        totalPrice = Number(challenge?.price || 0) + Number(totalPrice)    
                        console.log(totalPrice)            
                        // empty cart 
                    }
                }   
            }

            
            
        }
        
        const options = {
            amount: totalPrice,
            currency: 'INR',
            receipt: 'receipt'
        }
        order = await payment.orders.create(options)


        const orderDocument = await OrderModel.create({
            user: _id,
            orderId: order.id
        })

        res.status(StatusCodes.OK).json({
            success: true,
            data: order,
            message: Constants.orderCreatedSuccessfully
        })
    }   catch(error) {
            if(error instanceof Error) {
                next(error.message)
            }
    }
}