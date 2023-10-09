import passport from 'passport'
// const GoogleStrategy = require('passport-google-oauth20').Strategy
import { Strategy as JWTStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import env from '../utility/validateEnv'
import UserModel from '../models/user';
import logger from "../config/logger";
import { User } from '../interfaces/user';
import { Types } from 'mongoose';

// passport.use(new GoogleStrategy({
//     clientID: env.GOOGLE_CLIENT_ID,
//     clientSecret: env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/auth/google/redirect',
// }, (accessToken: string, refreshToken: string, profile: any, done: any) => {
//     // passport callback function
//     // save to db
// }))

type JWTToken = { 
    userId: Types.ObjectId
}

const options = {
    secretOrKey: env.JWT_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

export default passport.use(new JWTStrategy(options, async(token: JWTToken, done: VerifiedCallback) => {
    try {
        const user = await UserModel.findById(token.userId)
        
        if (user) done(null, token.userId) 
        else done(null, false)

    } catch (error) {
        logger.error(error)
        done(error)
    }
}))

