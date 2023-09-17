import express from 'express'
import passport from 'passport'

import * as Badge from '../controllers/badge'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false } ), checkIsinRole(ROLES.ADMIN), Badge.createBadge)

router.delete('/', checkIsinRole(ROLES.ADMIN), Badge.deleteBadge)


/** 
 * @openapi
 * /api/badge:
 *  get:
 *      operationId: getBadges
 *      responses: 
 *          '200': 
 *              description: OK     
 */

router.get('/', Badge.getAllBadges)

export default router