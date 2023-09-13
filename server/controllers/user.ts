import { RequestHandler } from "express"
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import nodemailer from'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport"
import jwt from 'jsonwebtoken'

import env from '../utility/validateEnv'
import logger from "../config/logger"
import UserModel from '../models/user'
import Otp from "../models/otp"

import { User } from "../interfaces/user"
import { StatusCodes } from "http-status-codes"
import { Constants } from "../utility/constants"

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'muhammmad.usman01357@gmail.com',
        pass: 'emutspemchwrnyqs'
    },
} as SMTPTransport.Options)

export const login: RequestHandler<unknown, unknown, User, unknown> = async (req, res, next) => {
   const { email, password } = req?.body

   try {
       
        const user = await UserModel.findOne({
            email
        })
        // error for security reasons
        if(!user)
            throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        const verifyCredentials = await bcrypt.compare(password, user.password)

        if (!verifyCredentials)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.invalidCredentials)

        const token = jwt.sign({ user }, env.JWT_SECRET_KEY, {
            expiresIn: '1d'
        })

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

export const googleLogin: RequestHandler = async (req, res, next) => {


}


export const register: RequestHandler = async (req, res, next) => {
    try {
        
        const { email, password, firstName, lastName, userName } = req?.body
        const clubs = ["Spartans", "Vikings", "Avengers", "Ninjas"]

        const existingUser = await UserModel.findOne({ email })
        
        if(existingUser)
            throw createHttpError(StatusCodes.BAD_REQUEST, Constants.userExists)

        const hashedPassword = await bcrypt.hash(password, 10)

        const assignClubRandomly = clubs[Math.random() * clubs.length]

        const newUser = new UserModel({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            club: assignClubRandomly,
            profileCompleted: 6/16 * 100
        })

        await newUser.save()

        await transporter.sendMail({
            from: {
                name: 'usman',
                address: 'muhammmad.usman01357@gmail.com',
            },
            to: email,
            subject: 'Thankyou for registering with us',
            text: 'You are registered',
            html: '<p> :) </p>'
        })

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

export const otp: RequestHandler<unknown, unknown, User, unknown> = async (req, res, next) => {
    
    try {
        const { email } = req?.body
        const user = UserModel.findOne({ email : email })

        if(!user) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

        let otp = Math.floor(Math.random() * 1000000 + 1)

        const otpData = await Otp.create({
            email: email,
            code: otp,
            expireIn: new Date().getTime() + 300 * 1000,
        })

        await transporter.sendMail({
            from: 'muhammmad.usman01357@gmail.com',
            to: email,
            subject: 'Change your Password',
            text: `Your otp is ${otp}`,
            html: "",
        })

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

export const password: RequestHandler<unknown, unknown, User, unknown> = async (req, res, next) => {
    
    try {
        const { email, otp, password } = req?.body

        const otpNumber = Otp.findOne({ email: email, otp: otp })

        if(!otpNumber) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.incorrectOtp)

        const user = await UserModel.findOne({ email: email })
        const hashPassword = await bcrypt.hash(password, 10)
        
        if(!user) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.userNotFound)

        await UserModel.findOneAndUpdate(
            { email: email }, 
            { password: hashPassword }
        )

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

export const getProfile: RequestHandler<unknown, unknown, User, unknown> = async (req, res, next) => {

    try {
        const loggedInUser = req.user as User
        
        const user = await UserModel.findById(loggedInUser._id)

        res.status(StatusCodes.OK).json({
            success: true, 
            data: user
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateProfile: RequestHandler<unknown, unknown, User, unknown> = async (req, res, next) => {
    
    try {
        
        const { dob, gender, weight, height, contact, country, state, city, role, profilePicture } = req?.body
        
        const user = req.user as User

        const profile : (keyof User)[]= ['dob', 'gender', 'weight', 'height', 'contact', 'country', 'state', 'city', 'role', 'profilePicture'];
        
        let profileCompletedAttributes = 5
        profile.map((attribute) => {
            if(req?.body[attribute]) 
                profileCompletedAttributes++
        })

        let profileCompleted = profileCompletedAttributes/16 * 100

        await UserModel.findByIdAndUpdate(
            user._id, 
            { ...req.body, profileCompleted  }        
        )

        res.status(StatusCodes.OK).json({
            success: true,
            data: profileCompleted
        })

    } catch (error) {
        logger.error(error)
        next(error)
    }
}