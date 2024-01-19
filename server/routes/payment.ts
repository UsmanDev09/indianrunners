import express from 'express'

import * as Payment from '../controllers/payment'
import passport from 'passport'

const router = express.Router()

router.post('/', Payment.initiatePayment)

router.put('/', passport.authenticate('jwt', { session: false }), Payment.updateDatabaseAfterPaymentVerified)

export default router
