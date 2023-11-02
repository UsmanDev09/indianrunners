import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import ManualActivityUploader from "@/components/Profile/ManualActivityUploader";

export default function ManualActivity() {
    return (
        <div className="container mx-auto mt-0 md:pl-16 sm:pl-8 flex md:flex-nowrap flex-wrap min-h-[calc(100vh-260px)]">
            <ProfileSideBar />
            <ManualActivityUploader />
        </div>
    )
}