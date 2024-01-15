import { AccountContextType } from "@/Interfaces";
import Cookies from "js-cookie";
const getAccount = (): AccountContextType => {
  const account = {
    account: {
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      userName: localStorage.getItem("userName"),
      profile: localStorage.getItem("profile"),
      token: Cookies.get("token")||null,
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
    },
  };
  return account;
};

export default getAccount;
