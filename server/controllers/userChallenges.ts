import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

import { Constants } from "../utility/constants"
// import { postReq } from "../ccAvenue/ccavRequestHandler"
import { UserChallengesInterface } from "../interfaces/userChallenges"
import UserChallenges from "../models/userChallenges"
import logger from "../config/logger"
import { User } from "../interfaces/user"


export const getUserChallenges: RequestHandler<unknown, unknown, UserChallengesInterface, unknown> = async (req, res, next) => {
     try {
        const user = req.user as User
        
        const userChallenges = await UserChallenges.find({ user: user._id})

        res.status(StatusCodes.OK).json({
            success: true,
            data: userChallenges,
            message: Constants.userChallengesFetchedSuccessfully
        })

        // uncomment it when integrating ccaveneue  
        // const response = postReq(req, res)
        // console.log(response)
    } catch(error) {
        logger.error(error)
        next(error)
    }
}

