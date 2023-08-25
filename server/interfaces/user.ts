import { StravaActivity } from "./stravaActivity"

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
    otp: number,
    role: Roles,
    activities: StravaActivity[]
}
