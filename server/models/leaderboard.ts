import mongoose, { InferSchemaType, model, Schema } from 'mongoose'

const leaderboardSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },  
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

export type Leaderboard = InferSchemaType<typeof leaderboardSchema>

export default model<Leaderboard>('Leaderboard', leaderboardSchema)