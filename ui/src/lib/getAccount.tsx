import { AccountContextType } from "@/Interfaces";

const getAccount = (): AccountContextType => {
  const account = {
    account: {
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      userName: localStorage.getItem("userName"),
      profile: localStorage.getItem("profile"),
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
    },
  };
  return account;
};

export default getAccount;
