import Cookies from "js-cookie";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const josef = Josefin_Sans({ subsets: ["latin"] });

const LoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(`${process.env.SERVER_DOMAIN}/api/user/login`, {
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
      body: JSON.stringify(formData),
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        if (data?.success) {
          Cookies.set("token", data.data.token as string);
          Cookies.set("role", data?.data?.user?.role as string);
          
          toast.success("You've successfully logged in")
          router.push("/profile");
        }
        else toast.error(data.message.message)
      }).catch(e=>toast.error(e));
  };
  return (
    <div
      className={`flex place-content-center ${josef.className} drop-shadow-md`}
    >
      <form
        className="flex flex-col items-center bg-prod dark:bg-dark rounded justify-center h-screen w-screen"
        onSubmit={submitForm}
      >
        <section className="bg-gray-100 dark:bg-dark-green sm:w-1/2">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-700 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Log In
                </h1>
                <div>
                  <label
                    id="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    id="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                >
                  Log In
                </button>
                <button
                  className="w-full mt-2 text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  type="button"
                  onClick={() => window.open('http://localhost:5000/api/user/google', '_self')}
                  data-testid="login-with-google"
                >
                    Log In with Google
                </button>
                <Link
                  href={"/signup"}
                  className="rounded text-center text-black text-underline underline  p-2 dark:text-white"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};
export default LoginForm;
