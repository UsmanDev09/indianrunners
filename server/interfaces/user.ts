import { Cart } from "./cart"
import { ShippingDetails } from "./shippingDetail"
import { Challenge } from './challenge'
import { ActivityInterface } from "./activity"

enum Roles { 
    Admin = 'admin',
    User = 'user',
}

export interface User {
    _id: number,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    profilePicture: string,
    dob: string,
    gender: string,
    weight: number,
    height: number,
    contact: number,
    country: string,
    state: string,
    city: string,
    profileCompleted: number,
    appsConnected: string,
    access_token: number,
    refresh_token: number,
    expires_at: Date,
    expires_in: number,
    otp: number,
    role: Roles,
    activities: ActivityInterface[]
    cart: Cart[],
    shippingDetails: ShippingDetails
    challenges: Challenge[] 
}
