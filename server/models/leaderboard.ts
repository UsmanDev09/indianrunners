import mongoose, { InferSchemaType, model, Schema } from 'mongoose'

const leaderboardSchema = new Schema({
    userDetails: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rank: { type: Number },
        IRPassport: { type: Number },
    }],
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ChallengeCategory' },

}, { timestamps: true })

type Leaderboard = InferSchemaType<typeof leaderboardSchema>

export default model<Leaderboard>('Leaderboard', leaderboardSchema)