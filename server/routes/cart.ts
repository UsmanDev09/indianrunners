import express from 'express'
import passport from 'passport'

import * as Cart from '../controllers/cart'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), Cart.addChallengeToCart)

router.put('/', passport.authenticate('jwt', { session: false }), Cart.updateCart)

router.get('/', passport.authenticate('jwt', { session: false }), Cart.getCart)

export default router