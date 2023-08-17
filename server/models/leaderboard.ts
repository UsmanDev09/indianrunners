import { InferSchemaType, model, Schema } from 'mongoose'
import user from './user'

const leaderboardSchema = new Schema({
    user: user,
    rank: { type: Number },
    IRPassport: { type: Number },

}, { timestamps: true })

type Leaderboard = InferSchemaType<typeof leaderboardSchema>


export default model<Leaderboard>('Leaderboard', leaderboardSchema)