import express from 'express'
import passport from 'passport'

import * as Inventory from '../controllers/inventory'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false } ), Inventory.createInventory)

router.get('/', passport.authenticate('jwt', { session: false } ), Inventory.getAllInventories)

router.get('/product/:_id', passport.authenticate('jwt', { session: false } ), Inventory.getAllProductsInInventory)

router.put('/product/:_id', passport.authenticate('jwt', { session: false } ), Inventory.updateProductInInventory)

router.delete('/', passport.authenticate('jwt', { session: false } ), Inventory.removeProductFromInventory)

export default router