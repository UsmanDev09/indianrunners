import ('../auth/index')

import { Request, Response } from "express"

import express from 'express'
import passport from 'passport'
import * as User from '../controllers/user'

const router = express.Router()

router.post('/login', User.login)

router.post('/googleLogin', User.googleLogin)

router.post('/register', User.register)

router.get('/otp', User.otp)

router.put('/profile', passport.authenticate('jwt', { session: false }), User.updateProfile)

router.get('/profile', passport.authenticate('jwt', { session: false }), User.getProfile)

router.put('/password', User.password)

router.post('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('google/redirect', passport.authenticate('google'), (req: Request, res: Response) => {
    // google redirect callback
})

export default router