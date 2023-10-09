import { Challenge as ChallengeInterface } from "../models/challenge";
import { Category as ChallengeCategoryInterface } from "../models/challengeCategory";
import { Product as ProductIntefrace } from "../models/product";

export interface ChallengeType {
    challenge: ChallengeInterface,
    challengeCategories: ChallengeCategoryInterface[],
    product: ProductIntefrace,
    productQuantity: Number
}

export interface Cart {
    _id: number,
    itemType: string,
    itemDetails: ChallengeType[]
} 