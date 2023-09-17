
import express from 'express'
import * as Strava from '../controllers/activity'

import passport from 'passport'

const router = express.Router()

// routes definition

router.post('/', passport.authenticate('jwt', { session: false }), Strava.postActivity)


router.get('/', Strava.getActivitiesByUser)

// Swagger Documentation for the /api/activity Routes

/**
 * @openapi
 * paths:
 *  /api/activity:
 *      post: 
 *          operationId: authorizeToGetActivityFromStrava
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
 */


/** 
 * @openapi
 * paths:
 *  /api/activity:
 *      get:
 *          operationId: getActivities
 *          responses: 
 *              200: 
 *                  description: OK         
 */

export default router