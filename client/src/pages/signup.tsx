import { Link } from "react-router-dom";
function SignUp() {
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
            <form className="flex flex-col gap-8 text-white">
              <div className="flex gap-6 text-white">
                <input
                  placeholder="First name"
                  className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
                ></input>
                <input
                  placeholder="Last name"
                  className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
                ></input>
              </div>
              <input
                placeholder="Username"
                className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
              ></input>
              <input
                placeholder="Password"
                className="bg-[#120121] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-400 transition"
              ></input>
              <button className="bg-pink-400 py-3 rounded-2xl hover:cursor-pointer">
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
