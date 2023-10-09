import express from 'express'
import passport from 'passport'

import * as Cart from '../controllers/cart'

const router = express.Router()

router.post('/challenge', passport.authenticate('jwt', { session: false }), Cart.addChallengeToCart)

router.delete('/challenge', passport.authenticate('jwt', { session: false }), Cart.removeChallengeFromCart)

router.post('/product', passport.authenticate('jwt', { session: false}), Cart.addProductToCart)

router.delete('/product', passport.authenticate('jwt', { session: false }), Cart.removeProductFromCart)

router.get('/', passport.authenticate('jwt', { session: false }), Cart.getCart)

/**
 * @openapi
 * paths:
 *  /api/cart:
 *     put:
 *       operationId: removeChallengeToCart
 *       security: 
 *         - bearerAuth: []
 *       responses: 
 *         200: 
 *          description: OK
 *          content: 
 *             application/json:
 *                 schema: 
 *                     $ref: '#/components/schemas/CartApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    CartApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Cart fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Cart'
 *    Cart: 
 *      type: object
 *      properties: 
 *         itemType:
 *           type: string
 *           ref: '#/components/schemas/ItemType'
 *         itemDetails:
 *           type: array
 *           items: 
 *             $ref: '#/components/schemas/ItemDetails'       
 *    ItemType:     
 *      type: object
 *      enum:   
 *        - challenge
 *        - product 
 *      example: challenge        
 *          
 *    ItemDetails:
 *      type: object
 *      properties:
 *          challenge: 
 *              type: object
 *              $ref: '#/components/schemas/Challenge'                  
 *          challengeCategory: 
 *              type: array
 *              items:    
 *                $ref: '#/components/schemas/ChallengeCategory' 
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
 *              example: 1-
 *          description: 
 *              type: string 
 *              example: Run 50 miles a day
 */


/**
 * @openapi
 * paths:
 *  /api/cart:
 *     post:
 *         operationId: addChallengeToCart
 *         security: 
 *           - bearerAuth: []
 *         responses: 
 *           200: 
 *            description: OK
 *            content: 
 *               application/json:
 *                   schema: 
 *                       $ref: '#/components/schemas/CartApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    CartApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Cart fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Cart'
 *    Cart: 
 *      type: object
 *      properties: 
 *         itemType:
 *           type: string
 *           ref: '#/components/schemas/ItemType'
 *         itemDetails:
 *           type: array
 *           items: 
 *             $ref: '#/components/schemas/ItemDetails'       
 *    ItemType:     
 *      type: object
 *      enum:   
 *        - challenge
 *        - product 
 *      example: challenge        
 *          
 *    ItemDetails:
 *      type: object
 *      properties:
 *          challenge: 
 *              type: object
 *              $ref: '#/components/schemas/Challenge'                  
 *          challengeCategory: 
 *              type: array
 *              items:    
 *                $ref: '#/components/schemas/ChallengeCategory' 
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
 *              example: 1-
 *          description: 
 *              type: string 
 *              example: Run 50 miles a day
 */


/** 
 * @openapi
 * paths: 
 *  /api/cart:
 *   get:
 *     operationId: getCart
 *     security: 
 *        - bearerAuth: [] 
 *     responses: 
 *        200: 
 *          description: OK
 *          content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/CartApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    CartApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Cart fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Cart'
 *    Cart: 
 *      type: object
 *      properties: 
 *         itemType:
 *           type: string
 *           ref: '#/components/schemas/ItemType'
 *         itemDetails:
 *           type: array
 *           items: 
 *             $ref: '#/components/schemas/ItemDetails'       
 *    ItemType:     
 *      type: object
 *      enum:   
 *        - challenge
 *        - product 
 *      example: challenge        
 *          
 *    ItemDetails:
 *      type: object
 *      properties:
 *          challenge: 
 *              type: object
 *              $ref: '#/components/schemas/Challenge'                  
 *          challengeCategory: 
 *              type: array
 *              items:    
 *                $ref: '#/components/schemas/ChallengeCategory' 
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
 *              example: 1-
 *          description: 
 *              type: string 
 *              example: Run 50 miles a day
 */

export default router