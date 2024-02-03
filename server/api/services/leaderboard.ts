import LeaderboardModel from '../models/leaderboard'
import { Challenge as ChallengeInterface } from '../models/challenge'
import { Category as ChallengeCategoryInterface } from '../models/challengeCategory'
import { Leaderboard } from '../models/leaderboard'
import mongoose, { Types } from 'mongoose'
import { Activity as ActivityInterface } from '../models/activity'
import { User as UserInterface} from '../models/user'

export const findLeaderboardByChallengeAndCategory = async (challenge: ChallengeInterface, category: ChallengeCategoryInterface)  => LeaderboardModel.findOne({ challenge: challenge._id, category: category._id })

export const findLeaderboardByChallenge = (challenge: ChallengeInterface) => LeaderboardModel.find( { challenge: challenge._id } )

export const findLeaderboardsByUserId = (_id: Types.ObjectId ) => LeaderboardModel.find({ 'userDetails.$.user': _id })

export const addUserToLeaderboard = (challenge: ChallengeInterface, category: any, user: UserInterface) =>  LeaderboardModel.updateOne({ challenge: challenge._id, category: category._id }, {$push: { 'userDetails': {user: user._id, rank: 0, pace: 0, distance:0, qualifiedDays: 0, qualifiedHours: 0 } } })

export const updateUserStaticticsInLeaderboard = (user: UserInterface, leaderboard: Leaderboard, activity: ActivityInterface) => 

        LeaderboardModel.findByIdAndUpdate(
            { _id: leaderboard._id },
            {
                $inc: {
                    'userDetails.$[elem].distance': activity.distanceCovered,
                }
            },
            {
                arrayFilters: [{ 'elem.user': new mongoose.Types.ObjectId(user._id) }],
                new: true
            }
        )
    


export const updateRankingInLeaderboard = (leaderboard: Leaderboard) => {
    leaderboard.userDetails.sort((a, b) => Number(b.distance || 0) - Number(a.distance || 0));
                          
    // Update ranks based on the sorted array
    leaderboard.userDetails.forEach((userDetail, index) => {
        userDetail.rank = index + 1;
    });
}

