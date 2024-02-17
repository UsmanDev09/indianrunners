import Razorpay from 'razorpay'
import env from './validateEnv'

export const payment = new Razorpay({ key_id: env.RAZOR_PAY_API_KEY, key_secret: env.RAZOR_PAY_API_SECRET })

