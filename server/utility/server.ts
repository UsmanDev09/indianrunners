import { NextFunction, Request, Response } from "express"
import express from 'express'
import userRoutes from '../routes/user'
import activityRoutes from '../routes/activity'
import challengeRoutes from '../routes/challenge'
import categoryRoutes from '../routes/category'
import createHttpError, { isHttpError } from 'http-errors'
import passport from 'passport'
import cors from 'cors'
import { Constants } from "./constants"

const app = express()

const server = () => {
    app.use(express.json())
    app.use(express.urlencoded( { extended: false} ))
    app.use(cors())
    // app.use(whitelistRequestBodyParams)
    app.use('/api/users', passport.authenticate('jwt', { session: false }), userRoutes)
    app.use('/api/activity', passport.authenticate('jwt', { session: false }), activityRoutes)
    app.use('/api/challenge', passport.authenticate('jwt', { session: false }), challengeRoutes)
    app.use('/api/category', passport.authenticate('jwt', { session: false }), categoryRoutes)

    // no endpoint
    app.use((req, res, next) => {
        next(createHttpError(404, Constants.routeNotFound))
    })

    // error handler
    app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
        let errorMessage = 'An unknown error occured.'
        let statusCode = 500
        if (isHttpError(error)){
            errorMessage = error.message
            statusCode = error.status
        }
        res.status(statusCode).json( { error: error } )
    })
    return app
}

export default server