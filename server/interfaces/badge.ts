export interface Badge {
    name: string,
    description: string,
    criteria: {
        activities: string,
        distance: number,
        numberOfActivities: number,
        consecutiveDays: number,
        specificDays: number,
    }
} 