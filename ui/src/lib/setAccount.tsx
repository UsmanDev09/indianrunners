const setAccount = (
  firstName: string | null,
  lastName: string | null,
  userName: string | null,
  profile: number | string | null
): void => {
  sessionStorage.setItem("firstName", firstName!);
  sessionStorage.setItem("lastName", lastName!);
  sessionStorage.setItem("userName", userName!);
  sessionStorage.setItem("profile", profile as string);
};

export default setAccount;
