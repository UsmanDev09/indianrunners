import { Challenge } from "@/types"
import ChallengeFilters from "./ChallengeFilters"
import ChallengeCard from "../ChallengeCard"

export const Challenges = ({ title, setChallenges, challenges } : { title: string, setChallenges: Function, challenges: Challenge[]}) => {

    return(
        <div className="flex mx-auto container justify-start">
          <ChallengeFilters setChallenges={setChallenges} />
            {challenges && challenges.map((challenge, index) => {
                return <ChallengeCard key={index} challenge={challenge} />
            })}
        </div>
    )
}