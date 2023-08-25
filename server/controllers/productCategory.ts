import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"

import { productCategory } from "../interfaces/productCategory"
import CategoryModel from "../models/productCategory"
import ProductModel from "../models/product"
import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"
import { Product } from "../interfaces/product"

export const createCategory: RequestHandler<unknown, unknown, productCategory, unknown> = async (req, res, next) => {
    try {
        const { name, description } = req?.body
        const { _id } = req.user as User;

        const category = await CategoryModel.findById(_id)
     
        res.status(StatusCodes.OK).json({
            success: true,
            data: category,
            message: Constants.categoryCreatedSuccessfully
        })
    } catch(error) {
        next(error)
    }
}

export const addProductsToCategory: RequestHandler<unknown, unknown, productCategory, unknown> = async (req, res, next) => {
    try {
        const { id,
            products
        } = req?.body

        const category = await CategoryModel.findById(id)
        
        if(!category) 
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.requiredParameters)
        
        products.map(async (product: Product) => {
            const singleProduct = await ProductModel.findById(product._id)
            category.products.push([singleProduct])     
        })
            
        res.status(StatusCodes.OK).json({
            success: true,
            data: category,
            message: Constants.productAddedToCategorySuccessfully
        })
    } catch(error) {
        next(error)
    }
}

export const getAllCategories: RequestHandler<unknown, unknown, productCategory, unknown> = async (req, res, next) => { 

    const categories = await CategoryModel.find()

    res.status(StatusCodes.OK).json({
        success: true,
        data: categories,
        message: Constants.categoriesFetchedSuccessfully
    })

}
