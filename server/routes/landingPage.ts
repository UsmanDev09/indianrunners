import express from 'express'
import passport from 'passport'
import multer from 'multer'

import * as LandingPage from '../controllers/landingPage'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

const storage = multer.memoryStorage(); // Store files in memory as Buffers

const upload = multer({ storage: storage });

router.post('/', passport.authenticate('jwt', { session: false } ), upload.single('mainSection[image]'), LandingPage.createLandingPage)

router.put('/', passport.authenticate('jwt', { session: false } ), LandingPage.updateLandingPageById)

router.get('/:_id', passport.authenticate('jwt', { session: false } ), LandingPage.getLandingPageById)

router.get('/', passport.authenticate('jwt', { session: false }), LandingPage.getAllLandingPages)


export default router