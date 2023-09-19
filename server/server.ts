import "dotenv/config"
import "./auth/index"
import { Worker } from 'bullmq'
import mongoose from "mongoose"
import createHttpError from "http-errors"
import { StatusCodes } from 'http-status-codes'
import { QueueEvents } from 'bullmq'

import UserModel from './models/user'
import BadgeModel from './models/badge'
import NotificationModel from "./models/notification"
import env from './utility/validateEnv'
import logger from './config/logger'
import server from './utility/server'
import { Constants } from './utility/constants'
import { ActivityInterface } from './interfaces/activity'
import * as socket from './utility/socket'

const app = server();

const port = env.SERVER_PORT || 5000;

mongoose
.connect(env.MONGO_CONNECTION_STRING)
.then(() => {
  logger.info("Mongoose connected");
})
.catch(logger.error)


const serverConnection = app.listen(port, () => {
  logger.info(`Server started on port: ${port}`)
})

socket.attach(serverConnection)

const worker = new Worker('badges', async job => {

  // recording activities between specific times 
  const activity: ActivityInterface = job.data
    // record any activity between 3am-5am
    
    let date = new Date(activity.startDate) 

    const user = await UserModel.findById(activity.userId)
    
    if(!user) 
        throw createHttpError(StatusCodes.NOT_FOUND, Constants.userNotFound)

    
    if((date.getUTCHours() > 3 || date.getUTCHours() < 5)) {   
      const badge = await BadgeModel.find({ name: 'Early Riser' })
      
      if(!badge) throw createHttpError(StatusCodes.NOT_FOUND, Constants.notFound) 
      
      const notification = await NotificationModel.create({ type: 'badge', message: 'Wohoo! You have earned the Early Riser badge' })
        
      user.badges.push(badge)
    }


    // recored a riding activity between  10pm - 11:59pm
    
    if((date.getUTCHours() > 10 || date.getUTCHours() < 12 && activity.activityType === 'Ride')) {
        const badge = await BadgeModel.find({ name: 'Night Rider'})
        
        const notification = await NotificationModel.create({ type: 'badge', message: 'Wohoo! You have earned the Night Rider badge' })
        
        user.badges.push(badge)
    }

});

const queueEvents = new QueueEvents('badges');

queueEvents.on('waiting', ({ jobId }) => {
  logger.info(`A job with ID ${jobId} is waiting`)
  console.log(`A job with ID ${jobId} is waiting`);
});

queueEvents.on('active', ({ jobId, prev }) => {
  logger.info(`Job ${jobId} is now active; previous status was ${prev}`)
  console.log(`Job ${jobId} is now active; previous status was ${prev}`)
});

queueEvents.on('progress', ({ jobId, data }, timestamp) => {
    logger.info(`${jobId} reported progress ${data} at ${timestamp}`)
    console.log(`${jobId} reported progress ${data} at ${timestamp}`)
});

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  logger.info(`${jobId} has completed and returned ${returnvalue}`)
  console.log(`${jobId} has completed and returned ${returnvalue}`)
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  logger.error(`${jobId} has failed with reason ${failedReason}`)  
  console.log(`${jobId} has failed with reason ${failedReason}`)
});


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')))
//     app.get('*',
//         (req, res) =>
//             res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index')))
// }