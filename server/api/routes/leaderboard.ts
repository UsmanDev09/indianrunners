import express from 'express'
import passport from 'passport'

import * as Leaderboard from '../controllers/leaderboard'

const router = express.Router()

router.get('/', passport.authenticate("jwt", { session: false } ), Leaderboard.getLeaderboardsByUserId)



/** 
 * @openapi
 * paths: 
 *  /api/leaderboard:
 *   get:
 *     operationId: getLeaderboards
 *     security: 
 *        - bearerAuth: [] 
 *     responses: 
 *        200: 
 *          description: OK
 *          content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/LeaderboardApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    LeaderboardApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Leaderboards fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Leaderboard'
 *    Leaderboard: 
 *      type: object
 *      properties: 
 *         _id:
 *           type: number
 *           example: 82713981209
 *         userDetails:
 *           type: object
 *           $ref: '#/components/schemas/UserDetails'  
 *         challenge: 
 *           type: object
 *           $ref: '#/components/schemas/Challenge'
 *         category: 
 *           type: object
 *           $ref: '#/components/schemas/Category' 
 *    UserDetails:     
 *      type: object
 *      properties: 
 *          user:
 *              type: object
 *              $ref: '#/components/schemas/User'
 *          rank:
 *              type: number
 *              example: 10
 *          distance:
 *              type: number
 *              example: 3
 *          pace: 
 *              type: string
 *              format: date
 *          qualifiedDays:
 *              type: number
 *              example: 3
 *          qualifiedHours: 
 *              type: number
 *          IRPassport: 
 *              type: number
 *    User:
 *      type: object
 *      properties: 
 *          email: 
 *              type: string
 *          password:
 *              type: string
 *          firstName: 
 *              type: string
 *          lastName: 
 *              type: string
 *          userName: 
 *              type: string
 *          dob: 
 *              type: string
 *              format: date
 *          gender:
 *              type: string
 *          weight:
 *              type: number
 *          height:
 *              type: number
 *          contact:
 *              type: number
 *          country:
 *              type: string
 *          state:
 *              type: string
 *          city:
 *              type: string
 *          role:
 *              type: string
 *          profileCompleted:
 *              type: number
 *          profilePicture:
 *              type: string
 *          club:
 *              type: string
 *          appsConnected:
 *              type: string 
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
 *    Category:
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