import express from 'express'

import * as Product from '../controllers/product'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"
import passport from 'passport'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), Product.createProduct)

// router.put('/product', checkIsinRole(ROLES.ADMIN), Product.updateProduct)

router.delete('/', Product.deleteProduct)

router.get('/', Product.getAllProducts)

export default router