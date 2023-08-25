import express from 'express'

import * as Challenge from '../controllers/challenge'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/', checkIsinRole(ROLES.ADMIN), Challenge.createChallenge)

router.put('/', checkIsinRole(ROLES.ADMIN), Challenge.updateChallenge)

router.delete('/', checkIsinRole(ROLES.ADMIN), Challenge.deleteChallenge)

router.get('/', Challenge.getAllChallenges)

export default router