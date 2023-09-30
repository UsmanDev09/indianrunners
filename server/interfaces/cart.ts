import { Challenge as ChallengeInterface } from "../models/challenge";
import { Category as ChallengeCategoryInterface } from "../models/challengeCategory";

export interface ChallengeType {
    challenge: ChallengeInterface,
    challengeCategories: ChallengeCategoryInterface[],
}

export interface Cart {
    _id: number,
    itemType: string,
    itemDetails: ChallengeType[]
} 