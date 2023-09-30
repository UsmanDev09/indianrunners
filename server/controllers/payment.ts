import { RequestHandler } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import { Queue, Worker } from 'bullmq';

// import { postReq } from "../ccAvenue/ccavRequestHandler"
import { Constants } from "../utility/constants"
import { User as UserInterface } from "../models/user"
import logger from "../config/logger"
import { UserChallengesInterface } from "../interfaces/userChallenges"
import { Category as ChallengeCategoryInterface } from "../models/challengeCategory"
import { Challenge as ChallengeInterface } from '../models/challenge'
import { findChallenge } from "../services/challenge";
import { createUserChallenge, findUserChallengeByUserId, updateUserChallengeByUserId } from "../services/userChallenges";
import { addChallengesToUserProfile } from "../services/user";
import { addUserToLeaderboard, findLeaderboardByChallenge } from "../services/leaderboard";
import { createNotification } from "../services/notification";

export const initiatePayment: RequestHandler<unknown, unknown, UserChallengesInterface, unknown> = async (req, res, next) => {
     try {
        const user = req.user as UserInterface

        const cart = user.cart

        if (!cart) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.cartIsEmpty)
        
        let userChallengesDetails, updateUserProfile

        // get itemdetails from cart 
        for (let cartItem of cart) {
            
            const { itemDetails } = cartItem

            for (let itemDetail of itemDetails) {
                const { challenge, challengeCategories } = itemDetail
                
                if (!challenge) throw createHttpError(StatusCodes.BAD_REQUEST, Constants.challengeNotFound)
                
                const challengeDocument: any = findChallenge(challenge) // change any
                
                if (!challengeDocument) throw createHttpError(StatusCodes.NOT_FOUND, Constants.challengeNotFound)
                // adds user to challenges

                if (!challengeDocument.users) challengeDocument.users = []

                challengeDocument.users.push(user._id)
                
                // adds details of user's challenges and payment status. Also, add categories in challenges
                const userChallenges = await findUserChallengeByUserId(user)
            
                if (userChallenges) {
                    userChallengesDetails = await updateUserChallengeByUserId(user, challenge)
                } else {
                    userChallengesDetails = await createUserChallenge(user, challenge)
                }
                
                updateUserProfile = await addChallengesToUserProfile(user, challenge)
                
                // adds user to leaderboard and notifies
                for (let category of challengeCategories) {
                    const leaderboard = await findLeaderboardByChallenge(challenge)

                    if(!leaderboard) throw createHttpError(StatusCodes.NOT_FOUND, Constants.leaderboardNotFound)
                    
                    if (!category) throw createHttpError(StatusCodes.BAD_GATEWAY, Constants.categoryNotFound)

                    await addUserToLeaderboard(challenge, category, user)
                    
                    await createNotification(challenge, category)
                
                    // schedule a cron job for starting date
                
                    
                    const leaderboardQueue = new Queue('Leaderboard')

                    // const startDate = new Date(challenge.startDate)

                    // const month = startDate.getMonth()

                    // const day = startDate.getDay()

                    // const hours = startDate.getHours()

                    // const minutes = startDate.getMinutes()

                    // const challengeEvaluationJob = await leaderboardQueue.add(
                    //     'dailyKnockoutChallengeEvaluation',
                    //     {
                    //         repeat: {
                    //             pattern: `* ${minutes} ${hours} ${day} ${month} *`,
                    //         },
                    //     },
                    // );
                    
                    const worker = new Worker('Leaderboard', async job => {
                        const currentDate = new Date()
                    
                        // const endDate = new Date(challenge.endDate)

                        // remove job if challenge is finished
                        // if (currentDate > endDate && job.id)  {
                        //     const jobs = await leaderboardQueue.getJob(job.id)
                            
                        //     if (jobs) await jobs.remove() 
                        // }

                        // runs dailyKnockoutChallengeEvaluation as first job
                        const activities = user.activities

                            if (!userChallenges) throw createHttpError(StatusCodes.NOT_FOUND, Constants.userChallengesAreEmpty)

                            userChallenges.challenges.forEach((challenge: ChallengeInterface) => {
                                // check if activity is between start date and end date 
                                // const startDate = new Date(challenge.startDate)
                                // const endDate = new Date(challenge.endDate)
                                // if(currentDate < startDate) console.log('challenge has not started yet')
                                // if(currentDate > endDate) console.log('challenge has ended')

                                // check if challenge is open and challenge category is related to activity type
                                // check if type is not knockout then error 
                                const challengeType = challenge.type
                                const categories = challenge.categories
                                
                                categories.forEach((category: ChallengeCategoryInterface) => {
                                    activities.forEach( async (activity: any) => {
                                        
                                        if (challengeType === 'open'  && !challenge.knockout) {
                                            // fetch all users in the challenge and rank according to distance covered
                                            
                                            
                                        }
                                        
                                        if (challengeType === 'fixed'  && !challenge.knockout ) {
                                            // check if challenge is fixed and repeat algo for knockout 

                                            
                                        }
                                        
                                        if (challenge.knockout && challenge.knockoutType === 'daily') {
                                            // if knockout then on daily, run cron jobs for fetching data every day and check if lower limit is completed and qualified days 
                                            // rank according to qualified days, then distance, then speed
                                            
                                            // const worker = new Worker(
                                            //     'dailyKnockoutChallengeEvaluation',
                                            //     async () => {
                                                    
                                            //     },
                                            // );

                                            // await myQueue.add(
                                            //     'dailyKnockoutChallengeEvaluation',
                                            //     {
                                            //       repeat: {
                                            //         every: 86400000,
                                            //       },
                                            //     },
                                            // );
                                        }
                    
                                        if(challenge.knockout && challenge.knockoutType === 'hourly') {
                                            // if knockout is hourly, run cron jobs every hour for fetching data and check if lower limit is completed and qualified hours
                                            // if knockout is hourly and strava is connected, run webhooks 
                                            // rank accoridng to qualified hours and then speed
                                        }
                    
                                    })
                                })
                            })
                                        
                            worker.on('completed', job => {
                                console.log(`${job.id} has completed!`);
                            });
                                
                            worker.on('failed', (job, err) => {
                                console.log(`${job?.id} has failed with ${err.message}`);
                            });

                        })
                            
                    }

                    // empty cart 
            }}

        res.status(StatusCodes.OK).json({
            success: true,
            message: Constants.orderCreatedSuccessfully
        })

        // uncomment it when integrating ccaveneue  
        // const response = postReq(req, res)
        // console.log(response)
    } catch(error: unknown) {
        if(error instanceof Error)
            console.log(error.message)
        logger.error(error)
        next(error)
    }
}

