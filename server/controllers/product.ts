import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { Product } from "../interfaces/product"
import ProductModel from "../models/product"
import mongoose from "mongoose"
import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"

export const createProduct: RequestHandler<unknown, unknown, Product, unknown> = async (req, res, next) => {
    try {
        const { name, description, details } = req?.body

        const product = await ProductModel.create(req.body)        
 
        res.status(StatusCodes.OK).json({
            success: true,
            data: product,
            message: Constants.productCreatedSuccessfully
        })
    } catch(error) {
        next(error)
    }
}


export const updateProduct: RequestHandler<unknown, unknown, Product, unknown> = async (req, res, next) => { 
    const { _id } = req?.body

    const product = ProductModel.findById(_id)

    if(!product) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    const updatedProduct = await ProductModel.findByIdAndUpdate(_id, req.body)

    res.status(StatusCodes.OK).json({
        success: true,
        data: updatedProduct,
        message: Constants.productUpdatedSuccessfully
    })

}

export const deleteProduct: RequestHandler<unknown, unknown, Product, unknown> = async (req, res, next) => { 
    const { _id } = req.body;

    if (!mongoose?.Types.ObjectId.isValid(_id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const product = await ProductModel.findById(_id)

    if(!product) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    await ProductModel.findByIdAndDelete(_id)

    res.status(StatusCodes.OK).json({
        success: true,
        data: [],
        message: Constants.productDeletedSuccessfully
    })

}

export const getAllProducts: RequestHandler<unknown, unknown, Product, unknown> = async (req, res, next) => { 

    const products = await ProductModel.find()

    res.status(StatusCodes.OK).json({
        success: true,
        data: products,
        message: Constants.challengesFetchedSuccessfully
    })

}


export const getProduct: RequestHandler<unknown, unknown, Product, unknown> = async (req, res, next) => { 

    const { _id } = req.body

    const product = await ProductModel.findById(_id)

    res.status(StatusCodes.OK).json({
        success: true,
        data: product,
        message: Constants.challengesFetchedSuccessfully
    })

}