import { Types } from "mongoose"
import { RequestHandler } from "express"
import { Leaderboard as LeaderboardInterface } from "../models/leaderboard"
import { User as UserInterface } from '../models/user'
import { findLeaderboardsByUserId } from '../services/leaderboard'
import { StatusCodes } from "http-status-codes"
import logger from "../config/logger"
import createHttpError from "http-errors"
import { Constants } from "../utility/constants"

export const getLeaderboardsByUserId: RequestHandler<unknown, unknown, LeaderboardInterface, unknown> = async (req, res, next) => {
    try {
        const _id = req.user as Types.ObjectId
        
        const leaderboards = await findLeaderboardsByUserId(_id)

        if(!leaderboards) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.leaderboardNotFound)

        res.status(StatusCodes.OK).json({
            success: true, 
            data: leaderboards,
            message: Constants.leaderboardFetchedSuccessfully
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


