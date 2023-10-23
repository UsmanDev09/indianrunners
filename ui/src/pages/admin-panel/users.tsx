import SideBar from '../../components/AdminPanel/Sidebar'
import Users from '../../components/AdminPanel/Users'

const AdminPanel = () => {
    return (
        <div className="flex w-full container mx-auto">
            <SideBar />
            <Users />
        </div>
    )
}
 
export default AdminPanel