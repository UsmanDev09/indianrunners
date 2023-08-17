import { StravaActivity } from "./stravaActivity"

enum Roles { 
    Admin = 'admin',
    User = 'user',
}

export interface User {
    _id: number,
    name: string,
    email: string,
    password: string,
    otp: number,
    role: Roles,
    activities: StravaActivity[]
}