import Dashboard from "@/components/AdminPanel/Dashboard"
import SideBar from "@/components/AdminPanel/Sidebar"

const AdminDashboard = () => {
    return (
        <div className="flex container mx-auto">
            <SideBar />
            <Dashboard />
        </div>
    )
}

export default AdminDashboard