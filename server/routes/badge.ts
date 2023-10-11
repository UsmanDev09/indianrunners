import express from 'express'
import passport from 'passport'
import multer from 'multer'

import * as Badge from '../controllers/badge'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

const storage = multer.memoryStorage(); // Store files in memory as Buffers

const upload = multer({ storage: storage });

router.post('/', passport.authenticate('jwt', { session: false } ), checkIsinRole(ROLES.ADMIN), upload.single('image'), Badge.createBadge)

router.delete('/', checkIsinRole(ROLES.ADMIN), Badge.deleteBadge)

/** 
 * @openapi
 * paths: 
 *  /api/badge:
 *   post:
 *     operationId: createBadges
 *     security: 
 *        - bearerAuth: [] 
 *     responses: 
 *        200: 
 *          description: OK
 *          content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/CreateBadgeApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    CreateBadgeApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Badge created successfully
 *         data:
 *           type: object
 *           $ref: '#/components/schemas/Badge'
 *    Badge: 
 *      type: object
 *      properties: 
 *         name:
 *           type: string
 *           example: Early Riser
 *         description:
 *           type: string
 *           example: You have recorded an activity between 3am - 5am
 *         criteria:
 *           type: object
 *           $ref: '#/components/schemas/BadgeCriteria'   
 *    BadgeCriteria:     
 *      properties: 
 *          activities:
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
 *              example: Walk
 *          distance:
 *              type: number
 *              example: 10
 *          consecutiveDays:
 *              type: number
 *              example: 3
 *          specificDays: 
 *              type: string
 *              format: date
 *          numberOfActivities:
 *              type: number
 *              example: 3
 *          category: 
 *              type: string
 *              enum: 
 *                - Single Activity 
 *                - Special Achievement 
 *                - Challenge 
 *                - Total Distance 
 *                - Multiple Activities
 */


/** 
 * @openapi
 * paths: 
 *  /api/badge:
 *   get:
 *     operationId: getBadges
 *     security: 
 *        - bearerAuth: [] 
 *     responses: 
 *        200: 
 *          description: OK
 *          content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/BadgeApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    BadgeApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Badges fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Badge'
 *    Badge: 
 *      type: object
 *      properties: 
 *         name:
 *           type: string
 *           example: Early Riser
 *         description:
 *           type: string
 *           example: You have recorded an activity between 3am - 5am
 *         criteria:
 *           type: object
 *           $ref: '#/components/schemas/BadgeCriteria'   
 *    BadgeCriteria:     
 *      type: object
 *      properties: 
 *          activities:
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
 *              example: Walk
 *          distance:
 *              type: number
 *              example: 10
 *          consecutiveDays:
 *              type: number
 *              example: 3
 *          specificDays: 
 *              type: string
 *              format: date
 *          numberOfActivities:
 *              type: number
 *              example: 3
 *          category: 
 *              type: string
 *              enum: 
 *                - Single Activity 
 *                - Special Achievement 
 *                - Challenge 
 *                - Total Distance 
 *                - Multiple Activities
 */

router.get('/', passport.authenticate('jwt', { session: false }), Badge.getAllBadges)

export default router