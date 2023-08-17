export interface Challenge {
    type: string,
    name: string,
    image: string, // 1920 * 1080
    startDate: Date,
    endDate: Date,
    logic: string,
    sport: string,
    tags: string,
    bibNumber: number, 
    featured: boolean,
    verified: boolean,
    organizationName: string,
    categoryId: number,
} 