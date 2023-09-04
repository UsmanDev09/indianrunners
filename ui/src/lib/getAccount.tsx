import { AccountContextType } from "@/Interfaces";

const getAccount = (): AccountContextType => {
  const account = {
    account: {
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      userName: localStorage.getItem("userName"),
      profile: localStorage.getItem("profile"),
    },
  };
  return account;
};

export default getAccount;
