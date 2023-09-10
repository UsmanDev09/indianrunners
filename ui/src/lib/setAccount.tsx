const setAccount = (
  firstName: string | null,
  lastName: string | null,
  userName: string | null,
  profile: number | string | null,
  token: string | null
): void => {
  localStorage.setItem("firstName", firstName!);
  localStorage.setItem("lastName", lastName!);
  localStorage.setItem("userName", userName!);
  localStorage.setItem("profile", profile as string);
  localStorage.setItem("token", token as string);
};

export default setAccount;
