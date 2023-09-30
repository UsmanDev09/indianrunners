import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

import { Challenge as ChallengeInterface} from "../models/challenge";
import { User as UserInterface } from "../models/user";
import { Activity as ActivityInterface } from "../models/activity";
import { findLeaderboardByChallengeAndCategory, updateRankingInLeaderboard, updateUserStaticticsInLeaderboard } from "../services/leaderboard";
import logger from "../config/logger";

export const updateLeaderboard = async (user: UserInterface, activities: ActivityInterface[], userChallenges: ChallengeInterface[]) => {

    const updatePromises: Promise<void>[] = [];

    userChallenges.forEach((challenge: ChallengeInterface) => {

        for (const activity of activities) {
            challenge.categories.forEach(async (category) => {
                if (activity.activityType?.toLowerCase() === category.activity) {
                    const leaderboardPromise = findLeaderboardByChallengeAndCategory(challenge, category)
                        .then(async (leaderboard) => {
                            if (leaderboard) {
                                const updatedUserStatisticsInLeaderboard = await updateUserStaticticsInLeaderboard(user, leaderboard, activity)

                                if (updatedUserStatisticsInLeaderboard) {
                                    updateRankingInLeaderboard(updatedUserStatisticsInLeaderboard);
                                    await updatedUserStatisticsInLeaderboard.save();
                                    console.log('Updated leaderboard:', updatedUserStatisticsInLeaderboard);
                                }
                            }
                        })
                        .catch((error) => {
                            throw createHttpError(StatusCodes.BAD_REQUEST, `Error updating leaderboard: ${error}`);
                        });

                    updatePromises.push(leaderboardPromise);
                }
            });
        }
    });

    try {
        await Promise.all(updatePromises);
        logger.info('All leaderboards updated successfully.');
    } catch (error: unknown) {
        if(error instanceof Error)
            logger.error(`Error updating leaderboards: ${error}`);

        throw createHttpError(StatusCodes.BAD_REQUEST, `Error updating leaderboards: ${error}`);
    }
};
