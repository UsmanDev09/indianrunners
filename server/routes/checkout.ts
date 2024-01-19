import express from 'express'
import passport from 'passport'

import * as Checkout from '../controllers/checkout'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false } ), Checkout.createCheckout)

export default router