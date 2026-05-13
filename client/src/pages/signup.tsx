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
      <div className="w-4/5 h-3/4 rounded-3xl bg-[#2a1f36] flex">
        {/**Left side */}
        <div className="flex-1"></div>
        {/**Right Side  */}
        <div className="flex-1 flex items-center justify-center ">
          <div className="flex-col flex gap-5 p-2">
            <div className="text-white flex flex-col  justify-center gap-5 ">
              <h1 className="text-5xl text-white">Create Account</h1>
              <p className="text-sm flex gap-1 self-start">
                Already have an account?
                <Link to={"/login"} className="text-blue-600">
                  Sign In
                </Link>
              </p>
            </div>
            <form
              className="flex flex-col gap-8 text-white"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-6 text-white">
                <input
                  placeholder="First name"
                  onChange={(e) => handleChange(e)}
                  name="firstname"
                  value={formData.firstname}
                  required
                  className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
                ></input>
                <input
                  name="lastname"
                  placeholder="Last name"
                  value={formData.lastname}
                  required
                  onChange={(e) => handleChange(e)}
                  className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
                ></input>
              </div>
              <input
                name="username"
                placeholder="Username"
                onChange={(e) => handleChange(e)}
                value={formData.username}
                required
                className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
              ></input>
              <input
                name="password"
                onChange={(e) => handleChange(e)}
                required
                value={formData.password}
                type="password"
                placeholder="Password"
                className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
              ></input>
              <button
                className="bg-pink-400 py-3 rounded-2xl hover:cursor-pointer"
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
