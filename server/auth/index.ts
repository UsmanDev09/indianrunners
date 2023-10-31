import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import { Strategy as JWTStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import jwt from 'jsonwebtoken'

import env from '../utility/validateEnv'
import UserModel, { User as UserInterface } from '../models/user';
import logger from "../config/logger";
import { Types } from 'mongoose';
import { sendEmail } from '../services/user';

const goolgleStrategy = GoogleStrategy.Strategy

passport.serializeUser((user, done) => {
    const token = jwt.sign(user, env.JWT_SECRET_KEY);
    console.log(token)
    done(null, token);
});

passport.use(new goolgleStrategy({
    clientID: '65295987407-2k7rtlh9u50b4f4tb3g7kfom57pm6mis.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5000/api/user/google/redirect',
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        console.log(profile)
        const { id, emails, displayName, picture } = profile

        const user = await UserModel.findOne({ google_id: id })

        if (!user) {
            const clubs = ["Spartans", "Vikings", "Avengers", "Ninjas"]


            const club = clubs[Math.random() * clubs.length]


            const subject = 'Thankyou for registering with us'
            const text = 'You are registered'
            const html = '<p> :) </p>'

            await sendEmail(subject, text, html, emails[0].value)
        
            const user = await UserModel.create({
                google_id: id,
                email: emails[0].value,
                name: displayName,
                profilePicture: picture,
                authenticator: 'google',
                profileCompleted: (5/16 * 100)
            })

            // const token = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, { expiresIn: '1d' }); // Change 'your-secret-key' to a strong secret key
            done(null, user)
        } else {

            // const token = jwt.sign({ userId: user._id }, env.JWT_SECRET_KEY, { expiresIn: '1d' }); // Change 'your-secret-key' to a strong secret key
            const user = await UserModel.findOne({ google_id: id })

            done(null, user)
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
        console.log('tk', token.userId)
        const user = await UserModel.findById(token.userId)

        if (user) done(null, token.userId) 
        else done(null, false)

    } catch (error) {
        logger.error(error)
        done(error)
    }
}))

