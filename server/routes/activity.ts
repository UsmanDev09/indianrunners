
import express from 'express'
import * as Strava from '../controllers/activity'
import { User as UserInterface } from '../models/user'
import UserModel from '../models/user'
import passport from 'passport'
import axios from 'axios'
import createHttpError from 'http-errors'
import { Constants } from '../utility/constants'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

// routes definition

router.post('/', passport.authenticate('jwt', { session: false }), Strava.authorizeToGetActivityFromStrava)

router.get('/', passport.authenticate("jwt", { session: false }), Strava.getActivitiesByUser)

router.get('/strava', passport.authenticate("jwt", { session: false}), Strava.getActivitiesFromStrava)

router.post('/strava-realtime', Strava.postActivities);
  
  // Adds support for GET requests to our webhook
router.get('/strava-realtime', Strava.getActivities)

router.post('/manual', passport.authenticate("jwt", { session: false}), Strava.uploadManualActivity)

router.put('/:activityId/manual-activity', passport.authenticate("jwt", { session: false}), Strava.updateManualActivityStatus)

// Swagger Documentation for the /api/activity Routes

/**
 * @openapi
 * paths:
 *  /api/activity:
 *      post:
 *          operationId: authorizeToGetActivityFromStrava 
 *          security:
 *             - bearerAuth: []
 *          requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                 required:
 *                   - code
 *          responses: 
 *               200: 
 *                  description: OK 
 *                  content: 
 *                      application/json: 
 *                          schema:
 *                             $ref: '#/components/schemas/AuthorizeStravaResponse'
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    AuthorizeStravaResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string                                                               
 */


/**
* @openapi
* paths:
*   /api/activity:
*     get:
*       operationId: getActivities
*       security:
*         - bearerAuth: []
*       responses:
*         200:
*           description: OK
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/ActivityApiResponse'
*   
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*   schemas:
*     ActivityApiResponse:
*       type: object
*       properties:
*         success:
*           type: boolean
*         message:
*           type: string
*         data:
*           type: array
*           items:
*             $ref: '#/components/schemas/Activity'
* 
*     Activity:
*       type: object
*       properties:
*         activityId:
*           type: integer
*         userId:
*           type: string
*         activityType:
*           type: string
*           enum:
*             - Walk
*             - Run 
*             - VirtualRun 
*             - TrailRun 
*             - Treadmil 
*             - Walk 
*             - Hike 
*             - Ride 
*             - MountainBikeRide 
*             - GravelBikeRide 
*             - VeloMobile 
*             - VirtialRide 
*             - HandCycle 
*             - Swim 
*             - CrossFit 
*             - Elliptical 
*             - StairStepper 
*             - WeightTraining 
*             - Workout 
*             - Hiit 
*             - Pilates 
*             - Yoga
*         startDate:
*           type: string
*           format: date-time
*         elapsedTime:
*           type: integer
*         movingTime:
*           type: integer
*         distanceCovered:
*           type: number
*         averageSpeed:
*           type: number
*         maximumSpeed:
*           type: number
*         totalAssent:
*           type: number
*/

export default router