import express from 'express'
import passport from 'passport'
import multer from 'multer'

import * as Challenge from '../controllers/challenge'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const storage = multer.memoryStorage(); // Store files in memory as Buffers

const upload = multer({ storage: storage });

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false } ), upload.single('image'), Challenge.createChallenge)

router.put('/', passport.authenticate('jwt', { session: false } ), checkIsinRole(ROLES.ADMIN), Challenge.updateChallenge)

// router.delete('/', passport.authenticate('jwt', { session: false } ), checkIsinRole(ROLES.ADMIN), Challenge.deleteChallenge)

router.get('/', passport.authenticate('jwt', { session: false } ), Challenge.getAllChallenges)

router.get('/:id', passport.authenticate('jwt', { session: false } ), Challenge.getChallenge)

/**
 * @openapi
 * paths:
 *  /api/challenge:
 *     post:
 *       operationId: createChallenge
 *       security: 
 *         - bearerAuth: []
 *       requestBody: 
 *          required: true
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  challengeData:
 *                    type: object
 *                    $ref: '#/components/schemas/Challenge'
 *       responses: 
 *         200: 
 *          description: OK
 *          content: 
 *             application/json:
 *                 schema: 
 *                     $ref: '#/components/schemas/ChallengeApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    ChallengeApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Challenge created successfully
 *         data:
 *           type: object
 *           $ref: '#/components/schemas/Challenge'
 *    Challenge:
 *      type: object
 *      properties: 
 *          name: 
 *              type: string
 *              example: Run 5 miles
 *          type:
 *              type: string
 *              enum: 
 *                - open
 *                - fixed
 *              example: open
 *          activity:
 *              type: string
 *              enum: 
 *                - single
 *                - multiple
 *              example: single
 *          knockout: 
 *              type: boolean
 *              example: true
 *          knockoutType: 
 *              type: string
 *              enum: 
 *                - daily 
 *                - hourly
 *              example: daily
 *          lowerLimit:
 *              type: number
 *              example: 5
 *          upperLimit:
 *              type: number
 *              example: 10
 *          fixedLimit: 
 *              type: number
 *          cutOffDays:
 *              type: number
 *              example: 2
 *          cutOffHours:
 *              type: number
 *          image:
 *              type: string
 *          startDate:
 *              type: string
 *              format: date
 *          endDate:
 *              type: string
 *              format: date
 *          sport: 
 *              type: string
 *              enum:
 *                - Walk
 *                - Run 
 *                - VirtualRun 
 *                - TrailRun 
 *                - Treadmil 
 *                - Walk 
 *                - Hike 
 *                - Ride 
 *                - MountainBikeRide 
 *                - GravelBikeRide 
 *                - VeloMobile 
 *                - VirtialRide 
 *                - HandCycle 
 *                - Swim 
 *                - CrossFit 
 *                - Elliptical 
 *                - StairStepper 
 *                - WeightTraining 
 *                - Workout 
 *                - Hiit 
 *                - Pilates 
 *                - Yoga
 *          tags:
 *              type: string
 *              example: run
 *          bibNumber:
 *              type: number
 *              example: 12938123
 *          featured:
 *              type: boolean
 *              example: true
 *          verified:
 *              type: boolean
 *              example: true
 *          organizationName:
 *              type: string
 *              example: true
 *          price:
 *              type: number
 *              example: true
 *          categories:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/ChallengeCategory'
 *    ChallengeCategory:
 *        type: object
 *        properties:
 *          name:
 *             type: string
 *             example: Indian Day
 *          activity:
 *             type: string
 *             enum:
 *               - Walk
 *               - Run 
 *               - VirtualRun 
 *               - TrailRun 
 *               - Treadmil 
 *               - Walk 
 *               - Hike 
 *               - Ride 
 *               - MountainBikeRide 
 *               - GravelBikeRide 
 *               - VeloMobile 
 *               - VirtialRide 
 *               - HandCycle 
 *               - Swim 
 *               - CrossFit 
 *               - Elliptical 
 *               - StairStepper 
 *               - WeightTraining 
 *               - Workout 
 *               - Hiit 
 *               - Pilates 
 *               - Yoga
 *             example: Yoga 
 *          distance:
 *              type: number
 *              example: 1
 *          description: 
 *              type: string 
 *              example: Run 50 miles a day
 */


/**
 * @openapi
 * paths:
 *  /api/challenge/:id:
 *     get:
 *       operationId: getChallenge
 *       security: 
 *         - bearerAuth: []
 *       responses: 
 *         200: 
 *          description: OK
 *          content: 
 *             application/json:
 *                 schema: 
 *                     $ref: '#/components/schemas/ChallengeApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    ChallengeApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Challenge fetched successfully
 *         data:
 *           type: object
 *           $ref: '#/components/schemas/Challenge'
 *    Challenge:
 *      type: object
 *      properties: 
 *          name: 
 *              type: string
 *              example: Run 5 miles
 *          type:
 *              type: string
 *              enum: 
 *                - open
 *                - fixed
 *              example: open
 *          activity:
 *              type: string
 *              enum: 
 *                - single
 *                - multiple
 *              example: single
 *          knockout: 
 *              type: boolean
 *              example: true
 *          knockoutType: 
 *              type: string
 *              enum: 
 *                - daily 
 *                - hourly
 *              example: daily
 *          lowerLimit:
 *              type: number
 *              example: 5
 *          upperLimit:
 *              type: number
 *              example: 10
 *          fixedLimit: 
 *              type: number
 *          cutOffDays:
 *              type: number
 *              example: 2
 *          cutOffHours:
 *              type: number
 *          image:
 *              type: string
 *          startDate:
 *              type: string
 *              format: date
 *          endDate:
 *              type: string
 *              format: date
 *          sport: 
 *              type: string
 *              enum:
 *                - Walk
 *                - Run 
 *                - VirtualRun 
 *                - TrailRun 
 *                - Treadmil 
 *                - Walk 
 *                - Hike 
 *                - Ride 
 *                - MountainBikeRide 
 *                - GravelBikeRide 
 *                - VeloMobile 
 *                - VirtialRide 
 *                - HandCycle 
 *                - Swim 
 *                - CrossFit 
 *                - Elliptical 
 *                - StairStepper 
 *                - WeightTraining 
 *                - Workout 
 *                - Hiit 
 *                - Pilates 
 *                - Yoga
 *          tags:
 *              type: string
 *              example: run
 *          bibNumber:
 *              type: number
 *              example: 12938123
 *          featured:
 *              type: boolean
 *              example: true
 *          verified:
 *              type: boolean
 *              example: true
 *          organizationName:
 *              type: string
 *              example: true
 *          price:
 *              type: number
 *              example: true
 *          categories:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/ChallengeCategory'
 *    ChallengeCategory:
 *        type: object
 *        properties:
 *          name:
 *             type: string
 *             example: Indian Day
 *          activity:
 *             type: string
 *             enum:
 *               - Walk
 *               - Run 
 *               - VirtualRun 
 *               - TrailRun 
 *               - Treadmil 
 *               - Walk 
 *               - Hike 
 *               - Ride 
 *               - MountainBikeRide 
 *               - GravelBikeRide 
 *               - VeloMobile 
 *               - VirtialRide 
 *               - HandCycle 
 *               - Swim 
 *               - CrossFit 
 *               - Elliptical 
 *               - StairStepper 
 *               - WeightTraining 
 *               - Workout 
 *               - Hiit 
 *               - Pilates 
 *               - Yoga
 *             example: Yoga 
 *          distance:
 *              type: number
 *              example: 1
 *          description: 
 *              type: string 
 *              example: Run 50 miles a day
 */


/**
 * @openapi
 * paths:
 *  /api/challenge:
 *     get:
 *       operationId: getAllChallenges
 *       security: 
 *         - bearerAuth: []
 *       responses: 
 *         200: 
 *          description: OK
 *          content: 
 *             application/json:
 *                 schema: 
 *                     $ref: '#/components/schemas/ChallengeApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    ChallengeApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Challenges fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Challenge'
 *    Challenge:
 *      type: object
 *      properties: 
 *          name: 
 *              type: string
 *              example: Run 5 miles
 *          type:
 *              type: string
 *              enum: 
 *                - open
 *                - fixed
 *              example: open
 *          activity:
 *              type: string
 *              enum: 
 *                - single
 *                - multiple
 *              example: single
 *          knockout: 
 *              type: boolean
 *              example: true
 *          knockoutType: 
 *              type: string
 *              enum: 
 *                - daily 
 *                - hourly
 *              example: daily
 *          lowerLimit:
 *              type: number
 *              example: 5
 *          upperLimit:
 *              type: number
 *              example: 10
 *          fixedLimit: 
 *              type: number
 *          cutOffDays:
 *              type: number
 *              example: 2
 *          cutOffHours:
 *              type: number
 *          image:
 *              type: string
 *          startDate:
 *              type: string
 *              format: date
 *          endDate:
 *              type: string
 *              format: date
 *          sport: 
 *              type: string
 *              enum:
 *                - Walk
 *                - Run 
 *                - VirtualRun 
 *                - TrailRun 
 *                - Treadmil 
 *                - Walk 
 *                - Hike 
 *                - Ride 
 *                - MountainBikeRide 
 *                - GravelBikeRide 
 *                - VeloMobile 
 *                - VirtialRide 
 *                - HandCycle 
 *                - Swim 
 *                - CrossFit 
 *                - Elliptical 
 *                - StairStepper 
 *                - WeightTraining 
 *                - Workout 
 *                - Hiit 
 *                - Pilates 
 *                - Yoga
 *          tags:
 *              type: string
 *              example: run
 *          bibNumber:
 *              type: number
 *              example: 12938123
 *          featured:
 *              type: boolean
 *              example: true
 *          verified:
 *              type: boolean
 *              example: true
 *          organizationName:
 *              type: string
 *              example: true
 *          price:
 *              type: number
 *              example: true
 *          categories:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/ChallengeCategory'
 *    ChallengeCategory:
 *        type: object
 *        properties:
 *          name:
 *             type: string
 *             example: Indian Day
 *          activity:
 *             type: string
 *             enum:
 *               - Walk
 *               - Run 
 *               - VirtualRun 
 *               - TrailRun 
 *               - Treadmil 
 *               - Walk 
 *               - Hike 
 *               - Ride 
 *               - MountainBikeRide 
 *               - GravelBikeRide 
 *               - VeloMobile 
 *               - VirtialRide 
 *               - HandCycle 
 *               - Swim 
 *               - CrossFit 
 *               - Elliptical 
 *               - StairStepper 
 *               - WeightTraining 
 *               - Workout 
 *               - Hiit 
 *               - Pilates 
 *               - Yoga
 *             example: Yoga 
 *          distance:
 *              type: number
 *              example: 1
 *          description: 
 *              type: string 
 *              example: Run 50 miles a day
 */

export default router