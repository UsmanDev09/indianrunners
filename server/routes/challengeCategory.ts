import express from 'express'

import * as Category from '../controllers/challengeCategory'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/', checkIsinRole(ROLES.ADMIN), Category.createCategory)

router.put('/', checkIsinRole(ROLES.ADMIN), Category.updateCategory)

router.delete('/', checkIsinRole(ROLES.ADMIN), Category.deleteCategory)

router.get('/', Category.getAllCategories)

export default router
