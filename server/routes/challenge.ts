import express from 'express'

import * as Challange from '../controllers/challenge'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/challenge', checkIsinRole(ROLES.ADMIN), Challange.createChallenge)

router.put('/challenge', checkIsinRole(ROLES.ADMIN), Challange.updateChallenge)

router.delete('/challenge', checkIsinRole(ROLES.ADMIN), Challange.deleteChallenge)

router.get('/challenge', Challange.getAllChallenges)

export default router