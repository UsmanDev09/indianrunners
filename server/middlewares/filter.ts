import _ from 'lodash'
import { RequestHandler } from 'express'

import { Constants } from '../utility/constants'
import { StatusCodes } from 'http-status-codes'

const filterRequestBody : RequestHandler<unknown, unknown, unknown, unknown> = (req, res, next) => {
    const prefix = '/api'
    let requiredParams:string[] = []
    let optionalParams:string[] = []

    if (req.method === 'POST' && req.originalUrl === `${prefix}/users/register`) {
        requiredParams = ['email', 'password', 'firstName', 'lastName', 'userName']
        // optionalParams = ['dob', 'gender','weight', 'height','contact','country','state','city','role', 'profileCompleted','profilePicture', 'club','appsConnected', 'activities']
    }
    else if (req.method === 'POST' && req.originalUrl === `${prefix}/users/login`) {
        requiredParams = ['email', 'password']
    }
    else if (req.method === 'GET' && req.originalUrl.startsWith(`${prefix}/users/otp`)) {
        requiredParams = ['code']
    }
    else if (req.method === 'POST' && req.originalUrl.startsWith(`${prefix}/activity`)) {
        // requiredParams = ['activityType', 'date', 'startTime', 'endTime', 'elapsedTime', 'movingTime', 'distanceCovered', 'averageSpeed', 'averageMovingSpeed', 'maximumSpeed', 'totalAssent', 'caloriesBurnt']
        // optionalParams = ['flag']
    }
    else if (req.method ===  'POST' && req.originalUrl.startsWith(`${prefix}/challenge`)) {
        requiredParams = ['type', 'name', 'image', 'startDate', 'endDate' ]
        optionalParams = ['activity', 'knockout', 'knockoutType','lowerLimit', 'upperLimit', 'fixedLimit', 'cutOffDays', 'cutOffHours',  'sport', 'tags', 'bibNumber', 'featured', 'verified', 'organizationName', 'price', 'categories']
    }
    else if (req.method === 'PUT' && req.originalUrl.startsWith(`${prefix}/challenge`)) {
        optionalParams = ['type', 'name', 'image', 'startDate', 'endDate', 'logic', 'sport', 'tags', 'bibNumber', 'featured', 'verified', 'organizationName', 'price', 'categories']
    }
    else if (req.method === 'DELETE' && req.originalUrl.startsWith(`${prefix}/challenge`)) {
        requiredParams = ['id']
    }
    else if (req.method === 'POST' && req.originalUrl.startsWith(`${prefix}/product`)) {
        requiredParams = ['name', 'description', 'details' ]
    }
    else if (req.method === 'PUT' && req.originalUrl.startsWith(`${prefix}/product`)) {
        optionalParams = ['name', 'description', 'details' ]
    }
    else if (req.method === 'POST' && req.originalUrl.startsWith(`${prefix}/badge`)) {
        requiredParams = ['name', 'description', 'criteria']
    }
    else if (req.method === 'DELETE' && req.originalUrl.startsWith(`${prefix}/badge`)) {
        requiredParams = ['id']
    }
    else if (req.method === 'POST' && req.originalUrl.startsWith(`${prefix}/challenge/category`)) {
        requiredParams = ['activity','distance', 'description']
    }
    else if (req.method === 'PUT' && req.originalUrl.startsWith(`${prefix}/challenge/category`)) {
        optionalParams = ['activity','distance', 'description']
    }
    else if (req.method === 'DELETE' && req.originalUrl.startsWith(`${prefix}/challenge/category`)) {
        requiredParams = ["id"]
    }
    else if (req.method === 'POST' && req.originalUrl.startsWith(`${prefix}/product/category`)) {
        requiredParams = ['name', 'description', 'products']
    }
    else if (req.method === 'PUT' && req.originalUrl.startsWith(`${prefix}/product/category`)) {
        optionalParams = ['name', 'description', 'products']
    }
    else if(req.method === 'POST' && req.originalUrl.startsWith(`${prefix}/cart`)){
        requiredParams = ['itemType']
        optionalParams = ['itemDetails']
    }
    else if(req.method === 'PUT' && req.originalUrl.startsWith(`${prefix}/cart`)){
        requiredParams = ['itemType']
        optionalParams = ['itemDetails']
    }
    else if(req.method === 'POST' && req.originalUrl.startsWith(`${prefix}/shippingDetails`)){
        requiredParams = ['address', 'city', 'state']
    }
    
    // filter extra parameters
    if (requiredParams.length > 0 || optionalParams.length > 0) {
        const requestParams = _.keysIn(req.body)
        const extraParams = _.difference(requestParams, requiredParams, optionalParams)
        if (extraParams.length > 0) {
            const forbiddenParams = extraParams.join(', ')
            const data = {
                success: false,
                message: Constants.forbiddenParameters(forbiddenParams)
            }
            return res.status(StatusCodes.BAD_REQUEST).json(data)
        }
        const incomingParams = _.intersection(requiredParams, requestParams)
        if (!_.isEqual(incomingParams, requiredParams)) {
            const missingParams = _.difference(requiredParams, incomingParams).join(', ')
            const data = {
                success: false,
                message: Constants.requiredParameters(missingParams)
            }
            return res.status(StatusCodes.BAD_REQUEST).json(data)
        }
    }
    next()
}
module.exports = {
    filterRequestBody
}
