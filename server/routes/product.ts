import express from 'express'
import multer from 'multer'

import * as Product from '../controllers/product'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"
import passport from 'passport'

const storage = multer.memoryStorage(); // Store files in memory as Buffers

const upload = multer({ storage: storage });

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), Product.createProduct)

// router.put('/product', checkIsinRole(ROLES.ADMIN), Product.updateProduct)

router.delete('/', Product.deleteProduct)

router.get('/', Product.getAllProducts)

export default router