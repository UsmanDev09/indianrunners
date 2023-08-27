import { Josefin_Sans } from "next/font/google";

const josef = Josefin_Sans({ subsets: ["latin"] });
const SignUpForm = () => {
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      firstname: HTMLInputElement;
      lastname: HTMLInputElement;
      username: HTMLInputElement;
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    const data = {
      firstName: formElements.firstname.value,
      lastName: formElements.lastname.value,
      userName: formElements.username.value,
      email: formElements.email.value,
      password: formElements.password.value,
    };
    console.log(data);
    fetch("http://localhost:5000/api/user/register", {
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
      body: JSON.stringify({ ...data }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        alert(JSON.stringify(data));
      });
  };
  return (
    <div
      className={`flex place-content-center ${josef.className} drop-shadow-md`}
    >
      <form
        className="flex flex-col items-center bg-prod mx-4 rounded justify-center h-full w-80 m-24"
        onSubmit={submitForm}
      >
        <div className="py-3 text-xl">SignUp Form</div>
        <label className="w-60">First Name</label>
        <input
          title="User Name"
          placeholder="Please Enter First Name"
          type="text"
          id="firstname"
          className="bg-white shadow-sm focus:outline-input outline outline-input w-60 rounded-l p-2"
        />
        <label className="w-60">Last Name</label>
        <input
          title="Last Name"
          placeholder="Please Enter Last Name"
          type="text"
          id="lastname"
          className="bg-white shadow-sm focus:outline-input outline outline-input w-60 rounded-l p-2"
        />
        <label className="w-60">User Name</label>
        <input
          title="User Name"
          placeholder="Please Enter User Name"
          type="text"
          id="username"
          className="bg-white shadow-sm focus:outline-input outline outline-input w-60 rounded-l p-2"
        />
        <label className="w-60 mt-2">Email</label>
        <input
          title="Email"
          placeholder="Please Enter Email"
          type="text"
          id="email"
          className="bg-white shadow-sm focus:outline-input outline outline-input w-60 rounded-l p-2"
        />
        <label className="w-60 mt-2">Password</label>
        <input
          title="Password"
          placeholder="Please Enter Password"
          type="password"
          id="password"
          className="bg-white shadow-sm focus:outline-input outline outline-input w-60 rounded-l p-2 "
        />
        <input
          type="submit"
          title="SignUp"
          className=" rounded text-white bg-pink p-2 w-60 m-3"
        />
      </form>
    </div>
  );
};
export default SignUpForm;
