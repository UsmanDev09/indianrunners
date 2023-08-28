import { Request, Response, NextFunction} from 'express'
import { Constants } from './constants'
import { User } from '../interfaces/user'

export const checkIsinRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.send(Constants.loginToProceed)
    }

    const hasRole = roles.find((role) => (req.user as User).role === role)

    if (!hasRole) {
        return res.send({ message: Constants.authorizationError})
    }

    next()
}