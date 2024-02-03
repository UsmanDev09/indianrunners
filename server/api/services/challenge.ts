import ChallengeModel from '../models/challenge'
import { Challenge as ChallengeInterface } from '../models/challenge'

export const findChallenge = (challenge: ChallengeInterface) => ChallengeModel.findOne({ _id: challenge._id })