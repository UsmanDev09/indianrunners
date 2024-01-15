import mongoose from "mongoose"
import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { v2 as cloudinary } from 'cloudinary'

import { Constants } from "../utility/constants"
import LandingPageModel, { LandingPage as LandingPageInterface } from "../models/landingPage"
import ProductModel from '../models/product'
import ChallengeModel from '../models/challenge'
import { uploadImageToCloudinary } from "../helpers/helper"
import logger from "../config/logger"
import env from "../utility/validateEnv"

export const createLandingPage: RequestHandler<unknown, unknown, LandingPageInterface, unknown> = async (req, res, next) => {
    try {
        const { mainSection, sections } = req.body
        let result

        if (req.file) {
            result = await uploadImageToCloudinary(req.file, 'mainSection')
        }

        const landingPage = await LandingPageModel.create({ mainSection: { image: result?.secure_url }, sections })

        res.status(StatusCodes.OK).json({
            success: true,
            data: landingPage,
            message: Constants.inventoryCreatedSuccessfully
        })
    } catch (error) {
        next(error)
    }
}

export const addSectionsToLandingPage: RequestHandler<unknown, unknown, LandingPageInterface, unknown> = async (req, res, next) => {
    try {

        const section = await LandingPageModel.updateOne({}, { $push: { 'sections': req.body } });

        const landingPages = await LandingPageModel.find().populate({ path: 'sections.products', model: 'Inventory', populate: { path: 'product', model: 'Product'} })

        res.status(StatusCodes.OK).json({
            success: true,
            data: landingPages,
            message: Constants.sectionRemovedSuccessfully
        })
    } catch (error) {
        if (error instanceof Error) {
            next(error.message)
        }
    }
}

export const getPreSignedUrlFromCloudinary: RequestHandler<unknown, unknown, { image: string }, unknown> = async(req, res, next) => { 
        try {
            const timestamp = `${Math.round(new Date().getTime() / 1000)}`;
            
            const paramsToSign = { timestamp }
            const signature =  cloudinary.utils.api_sign_request(paramsToSign, env.CLOUDINARY_API_SECRET);
                        
            const uploadUrl = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`;

            res.status(StatusCodes.OK).json({
                success: true,
                data:  { uploadUrl, timestamp, signature },
                message: Constants.updatedMainSectionImage
            })
        } catch (err) {
            if (err instanceof Error) {
                next(err.message)
            }
        }
    }

export const updateMainSectionOfLandingPage: RequestHandler<unknown, unknown, { image: string }, unknown> = async(req, res, next) => {
    try {

        const { image } = req.body; 

        const landingPage = await LandingPageModel.updateOne({}, { 'mainSection.image': image })
        
        res.status(StatusCodes.OK).json({
            success: true,
            data: landingPage,
            message: Constants.updatedMainSectionImage
        })

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
            next(error.message)
        }
    }
}

export const removeSectionById: RequestHandler<{ _id: string }, unknown, LandingPageInterface, unknown> = async (req, res, next) => {
    try {
        const { _id } = req.params;

        const section = await LandingPageModel.updateOne({ 'sections._id': new mongoose.Types.ObjectId(_id) }, { $pull: { 'sections': { _id: new mongoose.Types.ObjectId(_id) } } })
        const landingPage = await LandingPageModel.find()

        res.status(StatusCodes.OK).json({
            success: true,
            data: landingPage,
            message: Constants.sectionRemovedSuccessfully
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
            next(error.message)
        }
    }
}

export const updateSectionById: RequestHandler<{ _id: number }, unknown, LandingPageInterface, unknown> = async (req, res, next) => {
    try {
        const { _id } = req.params;
        console.log(req.body)
        const section = await LandingPageModel.updateOne({ 'sections._id':  new mongoose.Types.ObjectId(_id)  }, { $set: { 'sections.$': req.body } });
        console.log(section)
        const landingPage = await LandingPageModel.find()

        res.status(StatusCodes.OK).json({
            success: true,
            data: landingPage,
            message: Constants.sectionUpdatedSuccessfully
        })
    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message)
            next(error.message)
        }
    }
}

export const updateLandingPageById: RequestHandler<{ _id: number }, unknown, LandingPageInterface, unknown> = async (req, res, next) => {
    try {
        const { _id } = req.params

        const landingPages = await LandingPageModel.find()

        const landingPagesPromises = landingPages.map((landingPage: any) => {
            return LandingPageModel.findByIdAndUpdate({ _id: landingPage._id }, { selected: false })
        })

        await Promise.all(landingPagesPromises)

        await LandingPageModel.findByIdAndUpdate(_id, { selected: true })

        res.status(StatusCodes.OK).json({
            success: true,
            message: Constants.landingPageSuccessfullyFetched,
        })


    } catch (error) {
        next(error)
    }
}

export const getLandingPageById: RequestHandler<{ _id: number }, unknown, LandingPageInterface, unknown> = async (req, res, next) => {
    try {
        const { _id } = req.params

        const landingPage = await LandingPageModel.findById(_id).lean() as LandingPageInterface
        const { mainSection, sections } = landingPage

        const populatedSectionsPromises = sections.map(async (section) => {
            let populatedSection;

            if (section.type === 'product' && section.products) {
                populatedSection = await Promise.all(section.products.map(async (productId) => {
                    return await ProductModel.findById(productId).lean();
                }));
            } else if (section.type === 'challenge') {
                populatedSection = await Promise.all(section.challenges.map(async (challengeId) => {
                    return await ChallengeModel.findById(challengeId).lean();
                }));
            }

            return populatedSection;
        });

        const populatedSections = await Promise.all(populatedSectionsPromises)

        res.status(StatusCodes.OK).json({
            success: true,
            message: Constants.landingPageSuccessfullyFetched,
            data: { mainSection: mainSection, sections: populatedSections }
        })


    } catch (error) {
        next(error)
    }
}

export const getAllLandingPages: RequestHandler<{ _id: number }, unknown, LandingPageInterface, unknown> = async (req, res, next) => {
    try {

        const landingPages = await LandingPageModel.find().populate({ path: 'sections.products', model: 'Inventory', populate: { path: 'product', model: 'Product'} }).populate('sections.challenges')
          
        res.status(StatusCodes.OK).json({
            success: true,
            data: landingPages[0],
            message: Constants.landingPageSuccessfullyFetched
        })
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error.message)
            next(error.message)
        }
    }
}