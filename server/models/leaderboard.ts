import { InferSchemaType, model, Schema } from 'mongoose'
import userSchema from './user'
import challengeSchema from './challenge'
import challengeCategorySchema from './challengeCategory'

const leaderboardSchema = new Schema({
    userDetails: [{
        user: { type: userSchema.schema },
        rank: { type: Number },
        IRPassport: { type: Number },
    }],
    challenge: { type: challengeSchema.schema },
    category: { type: challengeCategorySchema.schema },

}, { timestamps: true })

type Leaderboard = InferSchemaType<typeof leaderboardSchema>

export default model<Leaderboard>('Leaderboard', leaderboardSchema)