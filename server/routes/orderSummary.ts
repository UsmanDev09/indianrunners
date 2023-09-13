import express from 'express'

import * as OrderSummary from '../controllers/orderSummary'

import passport from 'passport'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), OrderSummary.getOrderSummary)

export default router
