import express from 'express'
import multer from 'multer'

import * as Product from '../controllers/product'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"
import passport from 'passport'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), checkIsinRole(ROLES.ADMIN),  Product.createProduct)

router.put('/:_id', passport.authenticate('jwt', { session: false }), checkIsinRole(ROLES.ADMIN), Product.updateProduct)

router.delete('/:_id', passport.authenticate('jwt', { session: false }), checkIsinRole(ROLES.ADMIN), Product.deleteProduct)

router.get('/', passport.authenticate('jwt', { session: false }), Product.getAllProducts)


/**
 * @openapi
 * paths:
 *  /api/product:
 *     post:
 *       operationId: createProduct
 *       security: 
 *         - bearerAuth: []
 *       requestBody: 
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Product'
 *       responses: 
 *         200: 
 *          description: OK
 *          content: 
 *             application/json:
 *                 schema: 
 *                    $ref: '#/components/schemas/ProductApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    ProductApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Product created successfully
 *         data:
 *           type: object
 *           $ref: '#/components/schemas/Product'
 *    Product:
 *      type: object
 *      properties: 
 *          _id: 
 *            type: number
 *          name: 
 *            type: string
 *            example: Spiderman T-shirt
 *          price:
 *            type: number
 *            example: 1000
 *          description:
 *            type: string
 *            example: Cotton blended tshirt exported from Germany
 *          image: 
 *            type: string
 *            example: https://res.cloudinary.com/dpzlhahzg/image/upload/v1696875891/products
 */



/**
 * @openapi
 * paths:
 *  /api/product/{id}:
 *     put:
 *       operationId: updateProduct
 *       parameters:
 *          - in: path
 *            name: id
 *            schema:
 *               type: string
 *            required: true
 *       security: 
 *         - bearerAuth: []
 *       requestBody: 
 *          required: true
 *          content:
 *             application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Product'
 *       responses: 
 *         200: 
 *          description: OK
 *          content: 
 *             application/json:
 *                 schema: 
 *                    $ref: '#/components/schemas/ProductApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    ProductApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Product created successfully
 *         data:
 *           type: object
 *           $ref: '#/components/schemas/Product'
 *    Product:
 *      type: object
 *      properties: 
 *          _id: 
 *            type: number
 *          name: 
 *            type: string
 *            example: Spiderman T-shirt
 *          price:
 *            type: number
 *            example: 1000
 *          description:
 *            type: string
 *            example: Cotton blended tshirt exported from Germany
 *          image: 
 *            type: string
 *            example: https://res.cloudinary.com/dpzlhahzg/image/upload/v1696875891/products
 */


/**
 * @openapi
 * paths:
 *  /api/product/{id}:
 *     delete:
 *       operationId: deleteProduct
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:  
 *            type: string
 *         required: true
 *       security: 
 *         - bearerAuth: []
 *       responses: 
 *         200: 
 *          description: OK 
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * paths:
 *  /api/product:
 *     get:
 *       operationId: getAllProducts
 *       security: 
 *         - bearerAuth: []
 *       responses: 
 *         200: 
 *          description: OK
 *          content: 
 *             application/json:
 *                 schema: 
 *                     $ref: '#/components/schemas/ProductApiResponse'    
 * components: 
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *    ProductApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Products fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *    Product:
 *      type: object
 *      properties: 
 *          _id: 
 *              type: number
 *          name: 
 *              type: string
 *              example: Tshirt
 *          description:
 *              type: string
 *              example: Blended cotton tshirt
 *          price:
 *              type: number
 *              example: 1000`
 *          image: 
 *              type: string
 *              example: https://res.cloudinary.com/dpzlhahzg/image/upload/v1696875891/products
 */

export default router