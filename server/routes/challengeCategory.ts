import express from 'express'

import * as Category from '../controllers/challengeCategory'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/', checkIsinRole(ROLES.ADMIN), Category.createCategory)

router.put('/', checkIsinRole(ROLES.ADMIN), Category.updateCategory)

// router.delete('/', checkIsinRole(ROLES.ADMIN), Category.deleteCategory)

router.get('/', Category.getAllCategories)


/**
 * @openapi
 * paths:
 *  /api/challengeCategory:
 *     post:
 *       operationId: createChallengeCategory
 *       security: 
 *         - bearerAuth: []
 *       responses: 
 *         200: 
 *          description: OK
 *          content: 
 *             application/json:
 *                 schema: 
 *                     $ref: '#/components/schemas/ChallengeCategoryApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    ChallengeCategoryApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Challenge Category created successfully
 *         data:
 *           type: object
 *           $ref: '#/components/schemas/ChallengeCategory'
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
 *  /api/challengeCategory:
 *     get:
 *       operationId: getAllChallengeCategory
 *       security: 
 *         - bearerAuth: []
 *       responses: 
 *         200: 
 *          description: OK
 *          content: 
 *             application/json:
 *                 schema: 
 *                     $ref: '#/components/schemas/ChallengeCategoryApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    ChallengeCategoryApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Challenge Category fetched successfully
 *         data:
 *           type: array
 *           items: 
 *              $ref: '#/components/schemas/ChallengeCategory'
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
