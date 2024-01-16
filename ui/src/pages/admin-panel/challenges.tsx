import SideBar from '../../components/AdminPanel/Sidebar'
import Challenges from '../../components/AdminPanel/Challenges'
import { ApiService, Challenge, ChallengeCategory, Product } from '../api'

const AdminPanelChallenges = ({challenges, categories}: {challenges: Challenge[], categories: ChallengeCategory[]}) => {
    return (
        <div className="flex w-full container mx-auto">
            <SideBar />
            <Challenges initialChallenges={challenges} categories={categories} />
        </div>
    )
}

export const getServerSideProps = (async (context: any) => {

    const cookieHeader = context.req.headers.cookie
    const tokenRegex = /token=([^;]*)/;
    let challenges, categories

    if(cookieHeader) {
        const tokenMatch = cookieHeader.match(tokenRegex);

        let token = null;
        if (tokenMatch && tokenMatch.length > 1) {
            token = tokenMatch[1];
        }

    const response = await ApiService.getAllChallenges({}, token)
    const categoriesResponse =await ApiService.getAllChallengeCategory({}, token)

    if(response.data)
        challenges = response.data
    else 
        challenges = []

    if(categoriesResponse.data)
        categories = categoriesResponse.data
    else
        categories = []
    }

    return {props: { challenges, categories } }
}) 

export default AdminPanelChallenges