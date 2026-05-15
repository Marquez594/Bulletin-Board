import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type LoginType = {
  username: string;
  password: string;
};

type ErrorType = {
  error: string;
};
function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginType>({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data: ErrorType = await res.json();

    if (res.ok) {
      navigate("/");
    } else {
      setLoginError(data.error);
    }
  };
  return (
    <div className="h-screen bg-center flex justify-center items-center bg-[#120121] relative">
      {/**Area for login area */}
      <div className="w-3/4 h-4/5 rounded-3xl bg-[#2a1f36] flex">
        <div className="lg:flex-1 "></div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-8 w-full">
            <h1 className="text-white text-5xl">Sign In</h1>
            {/**This is where we get the sign in data */}
            <div className="flex justify-center items-center w-full">
              <form
                className="flex-col flex justify-center items-cente text-white gap-2 sm:w-2/3 w-4/5"
                onSubmit={handleSubmit}
              >
                <div className="flex-col flex w-full gap-8">
                  <input
                    placeholder="Username"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    className="p-3 bg-[#120121] rounded-2xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
                  ></input>
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    className="p-3 bg-[#120121] rounded-2xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
                  ></input>
                </div>
                <label className="text-[0.7rem] flex gap-1 pl-2">
                  Don't have an account?
                  <Link to={"/signup"} className="text-blue-600">
                    Click Here
                  </Link>
                </label>
                <button
                  className="bg-pink-400 py-3 rounded-2xl  text-white hover:cursor-pointer mt-8"
                  type="submit"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/**Error Message Display */}
      {loginError.length != 0 ? (
        <div className="bg-red-300/50 absolute top-0 min-w-1/4 py-2 px-1 rounded-b-2xl ">
          <h1 className="text-center">Error: {loginError} </h1>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
