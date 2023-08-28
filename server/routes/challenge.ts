import express from 'express'
import passport from 'passport'

import * as Challenge from '../controllers/challenge'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false } ), checkIsinRole(ROLES.ADMIN), Challenge.createChallenge)

router.put('/', passport.authenticate('jwt', { session: false } ), checkIsinRole(ROLES.ADMIN), Challenge.updateChallenge)

// router.delete('/', passport.authenticate('jwt', { session: false } ), checkIsinRole(ROLES.ADMIN), Challenge.deleteChallenge)

router.get('/', passport.authenticate('jwt', { session: false } ), Challenge.getAllChallenges)

router.get('/:id', passport.authenticate('jwt', { session: false } ), Challenge.getChallenge)

export default router