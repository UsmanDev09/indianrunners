import { MyGlobalContext } from "@/Hooks/useGlobalContext";
import setAccount from "@/lib/setAccount";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
const josef = Josefin_Sans({ subsets: ["latin"] });
const LoginForm = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(MyGlobalContext);
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
    };
    await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        ...data,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);

        if (data?.success) {
          dispatch({
            type: "ACCOUNT_UPDATE",
            payload: {
              firstName: data?.data?.user?.firstName,
              lastName: data?.data?.user?.lastName,
              userName: data?.data?.user?.userName,
              profile: data?.data?.user?.profileCompleted,
              token: data?.data.token,
            },
          });
          setAccount(
            state.account.firstName,
            state.account.lastName,
            state.account.userName,
            state.account.profile,
            state.account.token
          );
          router.replace("/Profile");
        }
      });
  };
  return (
    <div
      className={`flex place-content-center ${josef.className} drop-shadow-md`}
    >
      <form
        className="flex flex-col items-center bg-prod mx-4 rounded justify-center h-80 w-80 m-24"
        onSubmit={submitForm}
      >
        <div className="py-3 text-xl">Login Form</div>
        <input
          title="Email"
          placeholder="Please Enter Email"
          type="text"
          id="email"
          className="bg-white shadow-sm focus:outline-input outline outline-input w-60 rounded-l p-2"
        />
        <input
          title="Password"
          placeholder="Please Enter Password"
          type="password"
          id="password"
          className="bg-white shadow-sm focus:outline-input outline outline-input w-60 rounded-l p-2 m-2"
        />
        <input
          type="submit"
          title="Login"
          className=" rounded text-white bg-pink p-2 w-60 mt-3"
        />
        <div className="mt-2">Don&apos;t have an account?</div>
        <Link
          href={"/SignUp"}
          className="rounded text-center text-white bg-pink p-2 w-40"
        >
          Sign Up here
        </Link>
      </form>
    </div>
  );
};
export default LoginForm;
