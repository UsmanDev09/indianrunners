import { Request, Response, NextFunction} from 'express'
import { Constants } from './constants'
import { User } from '../interfaces/user'
import UserModel from '../models/user'
import { User as UserInterface } from '../models/user'

export const checkIsinRole = (...roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.send(Constants.loginToProceed)
    }
    
    const user = await UserModel.findById(req.user) as UserInterface
    
    if(!user)
        return res.send(Constants.loginToProceed)

    const hasRole = roles.find((role) => user?.role === role)
    console.log(hasRole, ...roles)
    if (!hasRole) {
        return res.send({ message: Constants.authorizationError})
    }

    next()
}