import mongoose from "mongoose"
import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"

import { Constants } from "../utility/constants"
import LandingPageModel, { LandingPage as LandingPageInterface } from "../models/landingPage"
import ProductModel from '../models/product'
import ChallengeModel from '../models/challenge'
import { uploadImageToCloudinary } from "../helpers/helper"
import logger from "../config/logger"

export const createLandingPage: RequestHandler<unknown, unknown, LandingPageInterface, unknown> = async (req, res, next) => {
    try {
        console.log(req.body)
        const { mainSection, sections } = req.body
        let result

        if(req.file) {
           result = await uploadImageToCloudinary(req.file, 'mainSection')
        }

        const landingPage = await LandingPageModel.create({ mainSection: { image: result?.secure_url }, sections})

        res.status(StatusCodes.OK).json({
            success: true,
            data: landingPage,
            message: Constants.inventoryCreatedSuccessfully
        })
    } catch (error) {
        next(error)
    }
}

export const updateLandingPageById: RequestHandler<{ _id: number }, unknown, LandingPageInterface, unknown> = async (req, res, next) => { 
    try{ 
        const { _id } = req.params

        const landingPages = await LandingPageModel.find()

        const landingPagesPromises = landingPages.map((landingPage) => {
            return LandingPageModel.findByIdAndUpdate({ _id: landingPage._id }, { selected: false })
        })
        
        await Promise.all(landingPagesPromises)

        await LandingPageModel.findByIdAndUpdate(_id, { selected: true } )

        res.status(StatusCodes.OK).json({
            success: true,
            message: Constants.landingPageSuccessfullyFetched,
        })


    } catch (error) {
        next(error)
    }
}

export const getLandingPageById: RequestHandler<{ _id: number }, unknown, LandingPageInterface, unknown> = async (req, res, next) => { 
    try{ 
        const { _id } = req.params
        
        const landingPage = await LandingPageModel.findById(_id).lean() as LandingPageInterface
        const { mainSection, sections } = landingPage
        console.log(mainSection, sections)
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
            data: { mainSection: mainSection,  sections: populatedSections }
        })


    } catch (error) {
        next(error)
    }
}

export const getAllLandingPages: RequestHandler<{ _id: number }, unknown, LandingPageInterface, unknown> = async (req, res, next) => { 
    try {
        const landingPages = await LandingPageModel.find()

        res.status(StatusCodes.OK).json({
            success: true,
            data: landingPages,
            message: Constants.landingPageSuccessfullyFetched
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}