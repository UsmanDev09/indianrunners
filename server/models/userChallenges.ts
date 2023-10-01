import { InferSchemaType, model, Schema } from 'mongoose'
import userSchema from './user'
import challengeSchema from './challenge'

const userChallengesSchema = new Schema({

    user: { type: userSchema.schema },
    challenges: { type: [challengeSchema.schema], default: []},
    paid: { type: Boolean, default: false}

}, { timestamps: true })

export type UserChallenges = InferSchemaType<typeof userChallengesSchema>


export default model<UserChallenges>('UserChallenges', userChallengesSchema)