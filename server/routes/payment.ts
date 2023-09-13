import express from 'express'

import * as Payment from '../controllers/payment'
import passport from 'passport'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), Payment.initiatePayment)

export default router
