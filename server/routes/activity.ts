
import express from 'express'
import * as Strava from '../controllers/activity'


const router = express.Router()

router.post('/',  Strava.postActivity)

router.get('/', Strava.getActivitiesByUser)

export default router