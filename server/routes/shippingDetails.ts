import express from 'express'
import passport from 'passport'

import * as shippingDetails from '../controllers/shippingDetail'


const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), shippingDetails.addShippingDetailsToUser)


export default router