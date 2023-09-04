import { AccountContextType } from "@/Interfaces";

const getAccount = (): AccountContextType => {
  const account = {
    account: {
      firstName: sessionStorage.getItem("firstName"),
      lastName: sessionStorage.getItem("lastName"),
      userName: sessionStorage.getItem("userName"),
      profile: sessionStorage.getItem("profile"),
    },
  };
  return account;
};

export default getAccount;
