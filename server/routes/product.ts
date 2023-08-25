import express from 'express'

import * as Product from '../controllers/product'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/product', checkIsinRole(ROLES.ADMIN), Product.createProduct)

router.put('/product', checkIsinRole(ROLES.ADMIN), Product.updateProduct)

router.delete('/product', checkIsinRole(ROLES.ADMIN), Product.deleteProduct)

router.get('/product', Product.getAllProducts)

export default router