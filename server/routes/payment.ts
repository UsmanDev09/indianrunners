import express from 'express'

import * as Payment from '../controllers/payment'

const router = express.Router()

router.post('/', Payment.initiatePayment)

export default router
