import ('../auth/index')

import { Request, Response } from "express"

import express from 'express'
import passport from 'passport'
import * as User from '../controllers/user'

const router = express.Router()

/**
 * @openapi
 * paths:
 *  /api/user/login:
 *      post: 
 *          operationId: login
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      email:
 *                        type: string
 *                      password:
 *                        type: string
 *                    required:
 *                      - email
 *                      - password
 *          responses: 
 *               200: 
 *                  description: OK  
 */


router.post('/login', User.login)

router.post('/googleLogin', User.googleLogin)

/**
 * @openapi
 * paths:
 *  /api/user/register:
 *      post: 
 *          operationId: register
 *          requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   firstName: 
 *                     type: string
 *                   lastName: 
 *                     type: string
 *                   userName: 
 *                     type: string
 *                 required:
 *                   - email
 *                   - password
 *                   - firstName
 *                   - lastName
 *                   - userName
 *          responses: 
 *               200: 
 *                  description: OK  
 */


router.post('/register', User.register)

/**
 * @openapi
 * paths:
 *  /api/user/otp:
 *      get:
 *          operationId: getOtp
 *          parameters: 
 *              - name: email
 *                in: query
 *                required: true
 *                schema: 
 *                     type: string
 *          responses: 
 *              200: 
 *                 description: OK
 *              400: 
 *                 description: BAD REQUEST 
 */


router.get('/otp', User.otp)

/**
 * @openapi
 * paths:
 *  /api/user/profile:
 *      put: 
 *          operationId: updateProfile
 *          requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   dob:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   weight: 
 *                     type: string
 *                   height: 
 *                     type: string
 *                   contact: 
 *                     type: string
 *                   country:
 *                     type: string
 *                   state: 
 *                      type: string
 *                   city: 
 *                      type: string
 *          responses: 
 *              200: 
 *                 description: OK  
 */


router.put('/profile', passport.authenticate('jwt', { session: false }), User.updateProfile)

/**
 * @openapi
 * paths:
 *  /api/user/profile:
 *   get: 
 *      operationId: getProfile
 *      responses: 
 *          200: 
 *             description: OK
 *          400: 
 *             description: BAD REQUEST
 */

router.get('/profile', passport.authenticate('jwt', { session: false }), User.getProfile)


/**
 * @openapi
 * paths:
 *  /api/user/password:
 *      put: 
 *          operationId: updatePassword
 *          requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   otp: 
 *                     type: string
 *          responses: 
 *              200: 
 *                 description: OK  
 */


router.put('/password', User.password)

router.post('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('google/redirect', passport.authenticate('google'), (req: Request, res: Response) => {
    // google redirect callback
})

export default router