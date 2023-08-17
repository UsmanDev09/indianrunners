import { Request, Response, NextFunction} from 'express'
import { Constants } from './constants'

export const checkIsinRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.send(Constants.loginToProceed)
    }

    if(!req) 
        return res.send('Req is not valid')

    // const hasRole = roles.find((role) => req?.user?.role === role)

    // if (!hasRole) {
    //     return res.send({ message: Constants.authorizationError})
    // }
}