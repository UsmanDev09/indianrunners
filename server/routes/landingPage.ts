import express from 'express'
import passport from 'passport'
import multer from 'multer'

import * as LandingPage from '../controllers/landingPage'
import { checkIsinRole } from "../utility/checkIsInRoles"
import { ROLES } from "../utility/constants"

const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false } ), LandingPage.addSectionsToLandingPage)

router.delete('/:_id', passport.authenticate('jwt', { session: false }), LandingPage.removeSectionById)

router.put('/:_id', passport.authenticate('jwt', { session: false } ), LandingPage.updateSectionById)

router.put('/', passport.authenticate('jwt', { session: false }), LandingPage.updateMainSectionOfLandingPage)

router.get('/signedUrl', LandingPage.getPreSignedUrlFromCloudinary)

router.get('/:_id', LandingPage.getLandingPageById)

router.get('/', LandingPage.getAllLandingPages)

export default router