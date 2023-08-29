import express from 'express'

import * as OrderSummary from '../controllers/orderSummary'

const router = express.Router()

router.get('/', OrderSummary.getOrderSummary)

export default router
