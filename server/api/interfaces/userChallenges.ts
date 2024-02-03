import { Document } from 'mongoose'
import { Challenge } from './challenge'
import { User } from './user'

export interface UserChallengesInterface extends Document{
    user: User, 
    challenges: Challenge[],
    paid: boolean
}