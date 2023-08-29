import { Challenge } from "./challenge";
import { ChallengeCategory } from "./challengeCategory";

export interface ChallengeType {
    challenge: Challenge,
    challengeCategories: ChallengeCategory[],
}

export interface Cart {
    _id: number,
    itemType: string,
    itemDetails: ChallengeType[]
} 