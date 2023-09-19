import express from 'express'

import * as Notification from '../controllers/notification'

const router = express.Router()

router.post('/', Notification.createNotification)

// router.delete('/', checkIsinRole(ROLES.ADMIN), Category.deleteCategory)

router.get('/', Notification.getAllNotifications)

export default router
