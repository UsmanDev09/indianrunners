import { Request, Response, NextFunction} from 'express'
import { User } from '../interfaces/user';

export const checkIsinRole = (...roles: []) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    if (!user) {
        return res.send('Please login to proceed')
    }

    if(!req) 
        return res.send('Req is not valid')

    const hasRole = roles.find((role) => user?.role === role)

    if (!hasRole) {
        return res.send({ message: 'You are unauthorized for this action'})
    }
}