import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type UserCreate = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserCreate>({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.trim();
    if (e.target.name == "firstname" || e.target.name == "lastname") {
      value = value.replace(/[^a-zA-Z]/g, "");
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      navigate("/login");
    }

    console.log("Server Reponse: ", data);
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className="h-screen bg-center flex justify-center items-center bg-[#120121]">
      <div className="w-4/5 md:w-4/5 h-fit rounded-3xl bg-[#2a1f36] flex lg:py-8 md:py-2 p-2">
        {/**Left side */}
        <div className="lg:flex-1"></div>
        {/**Right Side  */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="flex-col flex gap-5 p-2 w-4/5">
            <div className="text-white flex flex-col  justify-center gap-5 ">
              <h1 className="sm:text-5xl text-white text-3xl">
                Create Account
              </h1>
              <p className="md:text-sm flex gap-1 self-start text-[0.7rem]">
                Already have an account?
                <Link to={"/login"} className="text-blue-600">
                  Sign In
                </Link>
              </p>
            </div>
            <form
              className="flex flex-col md:gap-8 gap-4 text-white w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex md:gap-6 gap-4 text-white flex-col md:flex-row w-full ">
                <input
                  placeholder="First name"
                  onChange={(e) => handleChange(e)}
                  name="firstname"
                  value={formData.firstname}
                  required
                  className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition min-w-0 flex-1"
                ></input>
                <input
                  name="lastname"
                  placeholder="Last name"
                  value={formData.lastname}
                  required
                  onChange={(e) => handleChange(e)}
                  className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition min-w-0 flex-1"
                ></input>
              </div>
              <input
                name="username"
                placeholder="Username"
                onChange={(e) => handleChange(e)}
                value={formData.username}
                required
                className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition w-full"
              ></input>
              <input
                name="password"
                onChange={(e) => handleChange(e)}
                required
                value={formData.password}
                type="password"
                placeholder="Password"
                className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition w-full"
              ></input>
              <button
                className="bg-pink-400 py-3 rounded-2xl hover:cursor-pointer w-full"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
