import mongoose, { InferSchemaType, model, Schema, Types} from 'mongoose'
import { Category } from './challengeCategory'
import { Challenge } from './challenge'

const leaderboardSchema = new Schema({
    userDetails: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rank: { type: Number },
        distance: { type: Number },
        pace: { type: Number },
        qualifiedDays: { type: Number },
        qualifiedHours: { type: Number },
        IRPassport: { type: Number },
    }],
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ChallengeCategory' },

}, { timestamps: true })


type UserDetails = {
    user: mongoose.Types.ObjectId
    rank: Number
    distance: Number
    pace: Number
    qualifiedDays: Number
    qualifiedHours: Number
    IRPassport: Number
}

export interface Leaderboard extends Document {
    _id: Types.ObjectId,
    userDetails: UserDetails[]
    challenge: Challenge
    category: Category
}


export default model<Leaderboard>('Leaderboard', leaderboardSchema)