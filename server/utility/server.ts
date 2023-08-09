import { NextFunction, Request, Response } from "express"
import express from 'express'
import userRoutes from '../routes/user'
import createHttpError, { isHttpError } from 'http-errors'
import passport from 'passport'

const app = express()

const server = () => {
    app.use(express.json())
    app.use(express.urlencoded( { extended: false} ))
    // app.use(whitelistRequestBodyParams)
    app.use('/api/users',  userRoutes)
    app.use('api/products', passport.authenticate('jwt', { session: false }))

    // no endpoint
    app.use((req, res, next) => {
        next(createHttpError(404, "Route not found"))
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