import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { v2 as cloudinary } from "cloudinary"
import { uuid } from 'uuidv4';
import { Product as ProductInterface } from "../models/product"
import ProductModel from "../models/product"
import mongoose from "mongoose"
import { Constants } from "../utility/constants"
import logger from "../config/logger"

export const createProduct: RequestHandler<unknown, unknown, ProductInterface, unknown> = async (req, res, next) => {
    try {
        let imageBuffer: Buffer, base64Image: string, result
        const { name, details, description } = req.body;
        if(req.file) {
            imageBuffer = req.file.buffer;
            base64Image = imageBuffer.toString('base64');
            result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                folder: 'products', // Optional: specify the folder in Cloudinary
                public_id: uuid() // Optional: specify the public ID for the uploaded file
              }, (error, result) => {
                if (error) {
                  logger.error(error);
                } else {
                  logger.info(result);
                  // `result` contains the details of the uploaded image, including its public URL
                }
              });
        }
        // Upload the image to Cloudinary
        const product = await ProductModel.create({name, details, description, image: result?.secure_url})        
 
        res.status(StatusCodes.OK).json({
            success: true,
            data: product,
            message: Constants.productCreatedSuccessfully
        })
    } catch(error) {
        if( error instanceof Error) 
            console.log(error.message)
        next(error)
    }
}


export const updateProduct: RequestHandler<{ _id: number }, unknown, ProductInterface, unknown> = async (req, res, next) => { 
    try {
        const { _id } = req.params

        const product = ProductModel.findById(_id)

        if(!product) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

        const updatedProduct = await ProductModel.findByIdAndUpdate(_id, req.body)

        res.status(StatusCodes.OK).json({
            success: true,
            data: updatedProduct,
            message: Constants.productUpdatedSuccessfully
        })
    } catch (err) {
        logger.error(err)
        next(err)
    }

}

export const deleteProduct: RequestHandler<{ _id: number }, unknown, ProductInterface, unknown> = async (req, res, next) => { 
    const { _id } = req.params;

    if (!mongoose?.Types.ObjectId.isValid(_id)) {
        throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidId)
    }

    const product = await ProductModel.findById(_id)

    if(!product) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound)

    await ProductModel.findByIdAndUpdate(_id, { isDeleted: true })

    res.status(StatusCodes.OK).json({
        success: true,
        data: [],
        message: Constants.productDeletedSuccessfully
    })

}

export const getAllProducts: RequestHandler<unknown, unknown, ProductInterface, unknown> = async (req, res, next) => { 

    const products = await ProductModel.find({ isDeleted: false })

    res.status(StatusCodes.OK).json({
        success: true,
        data: products,
        message: Constants.productCreatedSuccessfully
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