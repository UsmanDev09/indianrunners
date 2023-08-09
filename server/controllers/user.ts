import { RequestHandler } from "express"
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import env from '../utility/validateEnv'
import nodemailer from'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { user } from "../interfaces/user"

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'usiddique09@gmail.com',
        passowrd: 'usman123'
    }
} as SMTPTransport.Options)

export const login: RequestHandler<unknown, unknown, user, unknown> = async (req, res, next) => {
   const { name, email, password, role } = req?.body

   try {
        if (!(name || email || password || role))
            throw createHttpError(400, "Please add missing fields")

        const user = await User.findOne({
            name, email
        })

        // error for security reasons
        if(!user)
            throw createHttpError(404, "Invalid Credenials")

        const verifyCredentials = await bcrypt.compare(password, user.password)

        if (!verifyCredentials)
            throw createHttpError(400, "Invalid Credentials")

        const token = jwt.sign({ user }, env.JWT_SECRET_KEY, {
            expiresIn: '1d'
        })

        res.status(201).json({
            name, email, role, token
        })
    } catch(error) {
        next(error)
    }

}

export const register: RequestHandler = async (req, res, next) => {
    const { name, email, password, role } = req?.body
    try {

        if(!(name || email || password || role))
            throw createHttpError(400, "Please add missing fields")

        const existingUser = await User.findOne({ email })

        if(existingUser)
            throw createHttpError(400, "User already exists")

        const hashedPassword = await bcrypt.hash(req.body.password, 10)


        const newUser = await new User({
           name: name,
           email: email,
           password: hashedPassword,
        })

        await newUser.save()

        // let sendEmail = await transporter.sendMail({
        //     from: 'usman.siddique@devsinc.com',
        //     to: email,
        //     subject: 'Thankyou for registering with us',
        //     text: 'You are registered',
        //     html: '<p> :) </p>'
        // })

        res.status(201).json(newUser)

    } catch(error){
        console.log(error)
        next(error)
    }
}