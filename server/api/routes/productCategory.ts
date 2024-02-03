import express from 'express'

import * as productCategory from '../controllers/productCategory'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/', checkIsinRole(ROLES.ADMIN), productCategory.createCategory)

router.put('/', checkIsinRole(ROLES.ADMIN), productCategory.addProductsToCategory)

router.get('/', productCategory.getAllCategories)

export default router
