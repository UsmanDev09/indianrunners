import mongoose from "mongoose"
import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { v2 as cloudinary } from "cloudinary"
import { uuid } from 'uuidv4';

import { Product as ProductInterface } from "../models/product"
import ProductModel from "../models/product"
import InventoryModel from "../models/inventory"
import { Constants } from "../utility/constants"
import logger from "../config/logger"
import { uploadImageToCloudinary } from "../helpers/helper"

export const createProduct: RequestHandler<unknown, unknown, ProductInterface, unknown> = async (req, res, next) => {
    try {
        console.log('data', req.body)
        const { name, price, description, image, rewardPoints } = req.body;


        const product = await ProductModel.create({ name, price, description, image, rewardPoints})        
        
        const products = await ProductModel.find( {isDeleted: false} )
        
        res.status(StatusCodes.OK).json({
            success: true,
            data: products,
            message: Constants.productCreatedSuccessfully
        })
    } catch(error) {
        if( error instanceof Error) 
            console.log(error.message)
        next(error)
    }
}


export const updateProduct: RequestHandler<any, unknown, ProductInterface, unknown> = async (req, res, next) => {
    try {
        const { _id } = req.params

        const product = ProductModel.findById(_id)

        if(!product) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

        await ProductModel.findByIdAndUpdate(_id, req.body)

        const products = await ProductModel.find({ isDeleted: false })

        res.status(StatusCodes.OK).json({
            success: true,
            data: products,
            message: Constants.productUpdatedSuccessfully
        })
    } catch (err) {
        logger.error(err)
        next(err)
    }

}

export const deleteProduct: RequestHandler<any, unknown, ProductInterface, unknown> = async (req, res, next) => { 
    console.log(req.params)
    const { _id } = req.params;

    if (!mongoose?.Types.ObjectId.isValid(_id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const product = await ProductModel.findById(_id)

    if(!product) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    await ProductModel.findByIdAndUpdate(_id, { isDeleted: true })

    const products = await ProductModel.find({ isDeleted: false })

    res.status(StatusCodes.OK).json({
        success: true,
        data: products,
        message: Constants.productDeletedSuccessfully
    })

}

export const getAllProducts: RequestHandler<unknown, unknown, ProductInterface, { name: string, minPrice: number, maxPrice: number, page: number, pageSize:number  }> = async (req, res, next) => { 

    interface PriceFilter {
        $gte?: number;
        $lte?: number;
    }

    const { name='asc', minPrice, maxPrice, page=1, pageSize=10 } = req.query

    const filters: any = {}
    const sort: { [key: string]: 'asc' | 'desc' } = {}
    
    if (minPrice && !isNaN(minPrice)) 
        filters.price = { $gte: minPrice }

    if (maxPrice && !isNaN(maxPrice))
        filters.price = { $lte: maxPrice }

    if (name === 'asc' || name === 'desc')
        sort.name = name
    
    const products: any = await ProductModel.find({ isDeleted: false}).skip(((page) - 1) * (pageSize))
        .limit(pageSize)

    const sortedAndFilteredDocuments = products
        .sort((a: any, b: any) => (sort.name === 'asc' ? a.name?.localeCompare(b.name) : b.name?.localeCompare(a.name)))

    res.status(StatusCodes.OK).json({
        success: true,
        data: sortedAndFilteredDocuments,
        message: Constants.productFetchedSuccessfully
    })

}


export const getProduct: RequestHandler<{_id: number}, unknown, ProductInterface, unknown> = async (req, res, next) => { 

    const { _id } = req.params

    const product = await ProductModel.findById({ _id, isDeleted: false })

    if(!product) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.productDoesNotExist)

    res.status(StatusCodes.OK).json({
        success: true,
        data: product,
        message: Constants.productFetchedSuccessfully
    })

}