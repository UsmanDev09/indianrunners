import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"

import CategoryModel from "../models/challengeCategory"
import { Category } from "../interfaces/challengeCategory"
import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"

export const createCategory: RequestHandler<unknown, unknown, Category, unknown> = async (req, res, next) => {
    const { activity, distance, description } = req?.body
 
    try {
        const category = await CategoryModel.create(req.body)        
 
        res.status(StatusCodes.OK).json({
            success: true,
            data: category,
            message: Constants.categoryCreatedSuccessfully
        })
    } catch(error) {
        next(error)
    }
}


export const updateCategory: RequestHandler<unknown, unknown, Category, unknown> = async (req, res, next) => { 
    const { activity, distance, description } = req?.body
    const { _id } = req.user as User;

    if (!mongoose?.Types.ObjectId.isValid(_id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const category = CategoryModel.findById(_id)

    if(!category) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    const updatedCategory = await CategoryModel.findByIdAndUpdate(_id, req.body)

    res.status(StatusCodes.OK).json({
        success: true,
        data: updatedCategory,
        message: Constants.categoryUpdatedSuccessfully
    })

}

export const deleteCategory: RequestHandler<unknown, unknown, Category, unknown> = async (req, res, next) => { 
    const { id } = req.body;

    if (!mongoose?.Types.ObjectId.isValid(id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const category = await CategoryModel.findById(id)

    if(!category) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    await CategoryModel.findByIdAndDelete(id)

    res.status(StatusCodes.OK).json({
        success: true,
        data: [],
        message: Constants.categoryDeletedSuccessfully
    })

}

export const getAllCategories: RequestHandler<unknown, unknown, Category, unknown> = async (req, res, next) => { 
    const categories = await CategoryModel.find()

    res.status(StatusCodes.OK).json({
        success: true,
        data: categories,
        message: Constants.categoriesFetchedSuccessfully
    })

}
