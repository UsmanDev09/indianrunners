import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from "react-hot-toast";

import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import AccountInfo from "../../components/Profile/AccountInfo";

const Profile = () => {
  const  token  = Cookies.get('token');
  const [user, setUser] = useState()

  useEffect(() => {
    fetch(`${process.env.SERVER_DOMAIN}/api/user/profile`, {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then(async (res) => {
      const response = await res.json()
      if(response?.success) setUser(response.data)
      else toast.error("Error fetching profile")
    })

  }, [token])
  return (
    <div className="container mx-auto flex md:flex-nowrap flex-wrap">
      <ProfileSideBar />
      <AccountInfo user={user}/>
    </div>
  );
};

export default Profile;
