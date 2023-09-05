
import express from 'express'
import * as Strava from '../controllers/activity'

import passport from 'passport'

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), Strava.postActivity)

router.get('/', Strava.getActivitiesByUser)

export default router