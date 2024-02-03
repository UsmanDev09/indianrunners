import SMTPTransport from "nodemailer/lib/smtp-transport"
import nodemailer from'nodemailer'

import UserModel, { User } from '../models/user'
import { User as UserInterface } from '../models/user'
import { Challenge as ChallengeInterface } from '../models/challenge'
import { Types } from "mongoose"

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'muhammmad.usman01357@gmail.com',
        pass: 'emutspemchwrnyqs'
    },
} as SMTPTransport.Options)

export const findUser = (email: string) => UserModel.findOne({ email })

export const findUserById = (_id: Types.ObjectId) => UserModel.findById(_id)

export const createUser = (user: UserInterface) =>  UserModel.create({ ...user, profileCompleted: 6/16 * 100 })

export const sendEmail = (subject: string, text: string, html: string, email: string) => transporter.sendMail({
    from: {
        name: 'usman',
        address: 'muhammmad.usman01357@gmail.com',
    },
    to: email,
    subject: subject,
    text: text,
    html: html
})

export const updateUser = (email: string, hashPassword: string) => UserModel.findOneAndUpdate({ email }, { password: hashPassword } )

export const updateUserById = (_id: Types.ObjectId, user: UserInterface) => UserModel.findByIdAndUpdate(_id, { $set: user })

export const addChallengesToUserProfile = (user: UserInterface, challenge: ChallengeInterface) => UserModel.findByIdAndUpdate(user._id, {$push: { 'challenges': challenge }})