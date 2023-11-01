import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import AccountInfo from "../../components/Profile/AccountInfo";
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { MyGlobalContext } from '@/Hooks/useGlobalContext';

const Profile = () => {
  const router = useRouter();
  const { token } = router.query;
  const { state, dispatch } = useContext(MyGlobalContext);
  const [user, setUser] = useState()

  if(token !== undefined && typeof token === "string") localStorage.setItem('token', JSON.stringify(token))
  Cookies.set("token", token as string, { expires: 100, secure: true, sameSite: 'strict' });
  // dispatch({
  //   type: "ACCOUNT_UPDATE",
  //   payload: {
  //     token: token,
  //   },
  // });
  useEffect(() => {
    console.log(user)
    fetch('http://localhost:5000/api/user/profile', {
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
      setUser(response.data)
    })

  }, [token, user])
  return (
    <div className="container mx-auto flex md:flex-nowrap flex-wrap">
      <ProfileSideBar />
      <AccountInfo user={user}/>
    </div>
  );
};

export default Profile;
