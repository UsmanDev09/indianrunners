import UserChallenges from "../models/userChallenges"
import { Challenge as ChallengeInterface } from '../models/challenge'
import { User as UserInterface } from '../models/user'

export const findUserChallengeByUserId = (user: UserInterface) => UserChallenges.findById(user._id)

export const updateUserChallengeByUserId = (user: UserInterface, challenge: ChallengeInterface) => UserChallenges.updateOne({ _id: user._id }, { $push: { challenge }}  )

export const createUserChallenge = (user: UserInterface, challenge: ChallengeInterface) =>  UserChallenges.create({ user, challenges: challenge, paid: true })