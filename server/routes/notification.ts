import express from 'express'
import passport from 'passport'

import * as Notification from '../controllers/notification'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }),Notification.createNotification)

// router.delete('/', checkIsinRole(ROLES.ADMIN), Category.deleteCategory)

router.get('/', passport.authenticate('jwt', { session: false }), Notification.getAllNotifications)


/** 
 * @openapi
 * paths: 
 *  /api/notification:
 *   get:
 *     operationId: getAllNotifications
 *     security: 
 *        - bearerAuth: [] 
 *     responses: 
 *        200: 
 *          description: OK
 *          content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/NotificationApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    NotificationApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Notifications fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Notification'
 * 
 *    Notification:
 *      type: object
 *      properties:
 *         type:
 *           type: string
 *           enum:
 *              - badges
 *              - challenge
 *              - user
 *           example: badges
 *         message:
 *           type: string
 *           example: You have been awarded Early Riser badge
 *         read:    
 *           type: boolean
 *           example: true
 *           
 */


export default router
