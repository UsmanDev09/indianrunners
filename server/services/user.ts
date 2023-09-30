import UserModel, { User } from '../models/user'
import { User as UserInterface } from '../models/user'
import { Challenge as ChallengeInterface } from '../models/challenge'

export const addChallengesToUserProfile = (user: UserInterface, challenge: ChallengeInterface) => UserModel.findByIdAndUpdate(user._id, {$push: { 'challenges': challenge }})