import SideBar from '../../components/AdminPanel/Sidebar'
import ChallengeCategories from '../../components/AdminPanel/ChallengeCategories'
import { ApiService, ChallengeCategory } from '../api'

const AdminPanelChallengeCategories = ({challengeCategories}: {challengeCategories: ChallengeCategory[]}) => {
    
    return (
        <div className="flex w-full container mx-auto">
            <SideBar />
            <ChallengeCategories initialChallengeCategories={challengeCategories} />
        </div>
    )
}

export const getServerSideProps = (async (context: any) => {

    const cookieHeader = context.req.headers.cookie
    const tokenRegex = /token=([^;]*)/;
    let challengeCategories

    if(cookieHeader) {
        const tokenMatch = cookieHeader.match(tokenRegex);

        let token = null;
        if (tokenMatch && tokenMatch.length > 1) {
            token = tokenMatch[1];
        }

    const response = await ApiService.getAllChallengeCategory({}, token)

    if(response.data)
        challengeCategories = response.data
    else 
        challengeCategories = []
    }

    return {props: { challengeCategories } }
}) 

export default AdminPanelChallengeCategories