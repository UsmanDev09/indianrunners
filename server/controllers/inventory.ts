import mongoose from "mongoose"
import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"

import { Inventory as InventoryInterface } from "../models/inventory"
import InventoryModel from "../models/inventory"
import ProductModel from "../models/product"
import { Constants } from "../utility/constants"

export const createInventory: RequestHandler<unknown, unknown, InventoryInterface, unknown> = async (req, res, next) => {
    try {

        const { product } = req.body

        const productDocument = await ProductModel.findById(product)

        if(!productDocument) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.productDoesNotExist)

        const inventory = await InventoryModel.create(req.body)        
 
        const inventoryDocument = await InventoryModel.find({_id: inventory._id}).populate('product')
            
        res.status(StatusCodes.OK).json({
            success: true,
            data: inventoryDocument,
            message: Constants.inventoryCreatedSuccessfully
        })
    } catch(error) {
        next(error)
    }
}


export const updateProductInInventory: RequestHandler<{ _id: number }, unknown, InventoryInterface, unknown> = async (req, res, next) => { 
    const { _id } = req.params

    const product = InventoryModel.findById(_id)

    if(!product) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    const updatedInventory = await InventoryModel.findByIdAndUpdate(_id, req.body)

    res.status(StatusCodes.OK).json({
        success: true,
        data: updatedInventory,
        message: Constants.inventoryUpdatedSuccessfully
    })

}

export const removeProductFromInventory: RequestHandler<{ _id: number }, unknown, InventoryInterface, unknown> = async (req, res, next) => { 
    const { _id } = req.params

    if (!mongoose?.Types.ObjectId.isValid(_id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const product = await InventoryModel.findById(_id)

    if(!product) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    await InventoryModel.findByIdAndUpdate(_id, { isDeleted: true })

    res.status(StatusCodes.OK).json({
        success: true,
        data: [],
        message: Constants.productDeletedFromInventorySuccessfully
    })

}

export const getAllProductsInInventory: RequestHandler<{ _id: number }, unknown, InventoryInterface, unknown> = async (req, res, next) => { 
    
    const { _id } = req.params

    const products = await InventoryModel.find({_id, isDeleted: false })

    res.status(StatusCodes.OK).json({
        success: true,
        data: products,
        message: Constants.productCreatedSuccessfully
    })

}


export const getAllInventories: RequestHandler<unknown, unknown, InventoryInterface, { name: string, minPrice: number, maxPrice: number, page: number, pageSize:number  }> = async (req, res, next) => { 
    interface PriceFilter {
        $gte?: number;
        $lte?: number;
    }

    const { name, minPrice, maxPrice, page, pageSize } = req.query

    const filters: { [key: string]: RegExp | boolean | PriceFilter | number  } = {}
    const sort: { [key: string]: 'asc' | 'desc' } = {}
    
    if (minPrice && !isNaN(minPrice)) 
        filters.price = { $gte: minPrice }

    if (maxPrice && !isNaN(maxPrice))
        filters.price = { $lte: maxPrice }

    if (name === 'asc' || name === 'desc')
        sort.name = name

    const product = await InventoryModel.find({ isDeleted: false, ...filters }).sort().skip(((page) - 1) * (pageSize))
                    .limit(pageSize).populate('product')

    if(!product) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.inventoryDoesNotExist)

    res.status(StatusCodes.OK).json({
        success: true,
        data: product,
        message: Constants.productFetchedSuccessfully
    })

}