import ('../auth/index')
import multer from "multer"
import { Request, Response } from "express"

import express from 'express'
import passport from 'passport'
import * as User from '../controllers/user'

const storage = multer.memoryStorage(); // Store files in memory as Buffers

const upload = multer({ storage: storage });

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

router.put('/profile', passport.authenticate('jwt', { session: false }), upload.single('image'), User.updateProfile)

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

router.get('/certificate', User.getCertificates)

export default router