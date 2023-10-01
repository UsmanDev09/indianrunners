import { Challenge } from "./challenge"
import { User } from "./user"
import { ChallengeCategory } from './challengeCategory'

export interface Leaderboard  {
    _id: number
    userDetails: [{
        user: User
        rank: number
        distance: number
        pace: number
        qualifiedDays: number
        qualifiedHours: number
        IRPassport: number
    }]
    challenge: Challenge
    category: ChallengeCategory
}