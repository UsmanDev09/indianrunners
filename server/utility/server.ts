import { NextFunction, Request, Response } from "express"
import createHttpError, { isHttpError } from 'http-errors'
import passport from 'passport'
import cors from 'cors'
import express from 'express'
import userRoutes from '../routes/user'
import activityRoutes from '../routes/activity'
import challengeRoutes from '../routes/challenge'
import challengeCategoryRoutes from '../routes/challengeCategory'
import productCategoryRoutes from "../routes/productCategory"
import { Constants } from "./constants"
import productRoutes from '../routes/productCategory'
import badgeRoutes from '../routes/badge'


const app = express()

const server = () => {
    console.log('here')
    app.use(express.json())
    app.use(express.urlencoded( { extended: false} ))
    app.use(cors())
    app.use(passport.initialize())
    // app.use(whitelistRequestBodyParams)
    app.use('/api/user', userRoutes)
    app.use('/api/activity', activityRoutes)
    app.use('/api/challenge', challengeRoutes)
    app.use('/api/product', productRoutes)
    app.use('/api/badge', badgeRoutes)

    app.use('/api/challenge/category', challengeCategoryRoutes)
    app.use('/api/product/category', productCategoryRoutes)

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
        res.status(statusCode).json( { 
            success: false,
            message: error 
        } )
    })
    return app
}

export default server