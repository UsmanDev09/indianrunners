import { Challenge } from './challenge'
import { User } from './user'

export interface UserChallengesInterface {
    user: User, 
    challenges: Challenge[],
    paid: boolean
}