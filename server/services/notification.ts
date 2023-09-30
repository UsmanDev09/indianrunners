import NotificationModel from '../models/notification'
import { Challenge as ChallengeInterface } from '../models/challenge'
import { Category as ChallengeCategoryInterface } from '../models/challengeCategory' 

export const createNotification = (challenge: ChallengeInterface, category: ChallengeCategoryInterface) => NotificationModel.create({ type: 'challenge', message: `You have been added to ${challenge.name} in category ${category.name} `})