import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"

import { Constants } from "../utility/constants"
import { User } from "../interfaces/user"
import { Response } from "../interfaces/response"
import { postReq } from "../ccAvenue/ccavRequestHandler"

export const initiatePayment: RequestHandler<unknown, unknown, User, unknown> = async (req, res, next) => {
     try {
        const response = postReq(req, res)
        console.log(response)
    } catch(error) {
        next(error)
    }
}

