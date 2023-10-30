import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import { Strategy as JWTStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import jwt from 'jsonwebtoken'

import env from '../utility/validateEnv'
import UserModel, { User as UserInterface } from '../models/user';
import logger from "../config/logger";
import { Types } from 'mongoose';

const goolgleStrategy = GoogleStrategy.Strategy

passport.serializeUser((user, done) => {
    const token = jwt.sign(user, env.JWT_SECRET_KEY);
    done(null, token);
});

passport.use(new goolgleStrategy({
    clientID: '65295987407-2k7rtlh9u50b4f4tb3g7kfom57pm6mis.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/api/user/google/redirect',
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        const { id, emails, displayName, picture } = profile

        const user = await UserModel.findOne({ googleId: id })

        if (!user) {
            
            const user = await UserModel.create({
                googleId: id,
                email: emails[0].value,
                name: displayName,
                profilePicture: picture,
                authenticator: 'google'
            })

            // const token = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, { expiresIn: '1d' }); // Change 'your-secret-key' to a strong secret key
            done(null, user)
        } else {

            const token = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, { expiresIn: '1d' }); // Change 'your-secret-key' to a strong secret key

            done(null, token)
        }
    } catch (err) {
        if(err instanceof Error) {
            console.log(err.message)
            done(err.message, false)
        }
    }
    // passport callback function
    // save to db
}))

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

