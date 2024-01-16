import { RequestHandler } from "express"
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import mongoose, { Types } from "mongoose"

import env from '../utility/validateEnv'
import logger from "../config/logger"
import UserModel, { User } from '../models/user'
import Otp from "../models/otp"

import ChallengeModel from '../models/challenge'
import { User as UserInterface } from "../models/user"
import { StatusCodes } from "http-status-codes"
import { Constants } from "../utility/constants"
import { createUser, findUser, findUserById, sendEmail, updateUser, updateUserById } from "../services/user"
import { createNotification } from "../services/notification"
import { uploadImageToCloudinary } from "../helpers/helper"

export const login: RequestHandler<unknown, unknown, UserInterface, unknown> = async (req, res, next) => {
   
    const { email, password } = req?.body

   try {
        const user = await findUser(email)
        
        // error for security reasons
        if(!user)
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        const verifyCredentials = await bcrypt.compare(password, user.password)

        if (!verifyCredentials)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidCredentials)

        const token = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, { expiresIn: '1d' })

        // res.setHeader('Set-Cookie', `token:${token}; HttpOnly`);

        const type = 'user'
        
        const message = `Wohoo! You have logged into your account`

        await createNotification(type, message)

        res.status(StatusCodes.OK).json({
            success: true,
            data: { user, token },
            message: Constants.userLoggedInSuccessfully
        })
        
    } catch(error) {
        logger.error(error)
        next(error)
    }

}

export const register: RequestHandler = async (req, res, next) => {
    try {
        const { email, password, ...userData } = req?.body
        const clubs = ["Spartans", "Vikings", "Avengers", "Ninjas"]

        const existingUser = await findUser(email)
        
        if(existingUser)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.userExists)

        const hashedPassword = await bcrypt.hash(password, 10)

        const club = clubs[Math.random() * clubs.length]

        const newUser = await createUser({ email, password, club, ...userData })

        const subject = 'Thankyou for registering with us'
        const text = 'You are registered'
        const html = '<p> :) </p>'

        await sendEmail(subject, text, html, email)

        res.status(StatusCodes.OK).json({
            success: true,
            data: newUser,
            message: Constants.userRegisteredSuccessfully
        })

    } catch(error){
        logger.error(error)
        next(error)
    }
}

export const otp: RequestHandler<{ email: string }, unknown, UserInterface, unknown> = async (req, res, next) => {
    
    try {
        const { email } = req?.params
        const user = UserModel.findOne({ email : email })

        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        let otp = Math.floor(Math.random() * 1000000 + 1)

        const otpData = await Otp.create({
            email: email,
            code: otp,
            expireIn: new Date().getTime() + 300 * 1000,
        })

        const subject = 'Change your Password'
        const text = `Your otp is ${otp}`
        const html = ""

        await sendEmail(subject, text, html, email)

        res.status(StatusCodes.OK).json({
            success: true,
            data: otpData,
            messages: Constants.otpSentSuccessfully,
        })

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const password: RequestHandler<unknown, unknown, { email: string, otp: string, password: string }, unknown> = async (req, res, next) => {
    
    try {
        const { email, otp, password } = req?.body

        const otpNumber = Otp.findOne({ email: email, otp: otp })

        if(!otpNumber) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.incorrectOtp)

        const user = await findUser(email)
        
        const hashPassword = await bcrypt.hash(password, 10)
        
        if(!user) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.userNotFound)

        await updateUser(email, hashPassword)

        res.status(StatusCodes.OK).json({
            success: true,
            data: user,
            messages: Constants.changedPasswordSuccessfully,
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }

}

export const getProfile: RequestHandler<unknown, unknown, UserInterface, unknown> = async (req, res, next) => {

    try {
        const _id = req.user as Types.ObjectId
        
        const user = await findUserById(_id)

        res.status(StatusCodes.OK).json({
            success: true, 
            data: user
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateProfile: RequestHandler<unknown, unknown, UserInterface, unknown> = async (req, res, next) => {
    
    try {
        let result
         
        if(req.file) {
            result = await uploadImageToCloudinary(req.file, 'badge')         
        }

        const _id = req.user as Types.ObjectId
        const  { dob, weight, gender, height, contact, country, state, city } = req.body
        const profile : (keyof UserInterface)[]= ['dob', 'gender', 'weight', 'height', 'contact', 'country', 'state', 'city', 'role', 'profilePicture'];
        
        let profileCompletedAttributes = 5
        
        profile.map((attribute) => {
            if(req?.body[attribute]) 
                profileCompletedAttributes++
        })

        let profileCompleted = profileCompletedAttributes/16 * 100
        
        await updateUserById(_id, { ...req.body, profileCompleted, profilePicture: result?.secure_url})

        res.status(StatusCodes.OK).json({
            success: true,
            data: profileCompleted
        })

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getCertificates: RequestHandler<unknown, unknown, UserInterface, unknown> = async (req, res, next) => {
    try {
        const _id = req.user 

        const user = await UserModel.findById(_id)
        
        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        res.status(StatusCodes.OK).json({
            success: true,
            data: user.certificates ? user.certificates : [],
            message: Constants.certificatesFetchedSuccessfully
        })
    } catch (err) {
        if(err instanceof Error){
            logger.error(err)
            next(err)
        }
    }
}

export const assignCertificateToAUser: RequestHandler<{userId: number, challengeId: number, certificateUrl: number }, unknown, { certificateUrl: string }, unknown> = async (req, res, next) => {
    try {
        const { userId, challengeId } = req.params

        const { certificateUrl } = req.body

        const challenge = await ChallengeModel.findById(challengeId) 

        if(!challenge) throw createHttpError(StatusCodes.NOT_FOUND ,Constants.challengeNotFound)

        await ChallengeModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(challengeId) }, { userDetails: { user: userId, certificateSent: true } }) 

        const user = await UserModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, { $push: { certificates: certificateUrl } })

        res.status(StatusCodes.OK).json({
            success: true,
            data: [],
            message: Constants.certificateAssignedSuccessfully
        })
    } catch (err) {
        if(err instanceof Error){ 
            logger.error(err.message)
            next(err.message)
        }
    }
}