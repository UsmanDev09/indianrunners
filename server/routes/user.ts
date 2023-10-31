import ('../auth/index')
import multer from "multer"
import { Request, Response } from "express"

import express from 'express'
import passport from 'passport'
import * as User from '../controllers/user'
import UserModel from '../models/user'
import jwt from 'jsonwebtoken'
import env from '../utility/validateEnv'

const storage = multer.memoryStorage(); // Store files in memory as Buffers

const upload = multer({ storage: storage });

const router = express.Router()

router.post('/login', User.login)

router.post('/register', User.register)

router.get('/otp', User.otp)

router.put('/profile', passport.authenticate('jwt', { session: false }), upload.single('image'), User.updateProfile)

router.get('/profile', passport.authenticate('jwt', { session: false }), User.getProfile)

router.put('/password', User.password)

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

// callback route to redirect to
router.get('/google/redirect', passport.authenticate('google', { session: false }), async (req: any, res: Response, next: any) => {
    // google redirect callback
    const {_id} = req.user

    const payload = {
        userId: _id
    }
    const token = jwt.sign(payload, env.JWT_SECRET_KEY);
    
    res.redirect(`http://localhost:3000/profile?token=${token}`);
})

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


/**
 * @openapi
 * paths:
 *  /api/user/profile:
 *      put: 
 *          operationId: updateProfile
 *          requestBody:
 *           required: true
 *           content:
 *             multipart/form-data:
 *               schema:
 *                 type: object
 *                 properties:
 *                   image: 
 *                     type:string
 *                     format: binary
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
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/UserApiResponse'
 * components: 
 *  schemas:
 *    UserApiResponse: 
 *      type: object  
 *      properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: User logged in successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 * 
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
 */


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

export default router