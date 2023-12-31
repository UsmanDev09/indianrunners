import { ChallengeCategory } from './challengeCategory'

export interface Challenge {
    _id: number,
    type: string,
    name: string,
    activity: string,
    knockout: boolean,
    knockoutType: string,
    lowerLimit: number,
    upperLimit: number,
    fixedLimit: number,
    cutOffDays: number,
    cutOffHours: number,
    image: string, // 1920 * 1080
    startDate: Date,
    endDate: Date,
    sport: string,
    tags: string,
    bibNumber: number, 
    featured: boolean,
    verified: boolean,
    organizationName: string,
    price: number,
    minPrice: number,
    maxPrice: number,
    categories: ChallengeCategory[],
    users: Number[],
    leaderBoard: Number[],
} 