import express from 'express'
import passport from 'passport'

import * as shippingDetails from '../controllers/shippingDetail'


const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), shippingDetails.addShippingDetailsToUser)


/** 
 * @openapi
 * paths: 
 *  /api/shippingDetail:
 *   post:
 *     operationId: createShippingDetail
 *     security: 
 *        - bearerAuth: [] 
 *     responses: 
 *        200: 
 *          description: OK
 *          content: 
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/ShippingDetailApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    ShippingDetailApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Shipping Details created successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ShippingDetail'
 * 
 *    ShippingDetail:
 *      type: object
 *      properties: 
 *          address: 
 *              type: string
 *          city: 
 *              type: string
 *          state:
 *              type: string     
 */

export default router