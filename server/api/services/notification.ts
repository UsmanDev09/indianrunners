import NotificationModel from '../models/notification'
import { Challenge as ChallengeInterface } from '../models/challenge'
import { Category as ChallengeCategoryInterface } from '../models/challengeCategory' 

export const createNotification = (type: string, message: string) => NotificationModel.create({ type, message })