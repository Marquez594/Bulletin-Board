import { useState } from "react";
import Pfp from "../../public/pfp.png";
import type { UserType } from "../pages/home";
import { Link } from "react-router-dom";

type NavProp = {
  user: UserType | null;
};

function Nav({ user }: NavProp) {
  const [openNav, setOpenNav] = useState(false);
  return (
    <nav className=" fixed w-full">
      <button
        className="w-10 h-10 hover:cursor-pointer absolute left-5 top-5 z-10 bg-[#120121] rounded-full"
        onClick={() => setOpenNav(!openNav)}
      >
        <img src={Pfp}></img>
      </button>
      <h1 className="text-white right-5 top-5 fixed text-2xl">
        {user?.username || ""}
      </h1>
      <div
        className={`bg-[#2a1f36] w-1/6 full h-screen pt-20 text-white p-5 fixed transition-transform ease-in-out duration-100  ${openNav ? "translate-x-0 " : "-translate-x-full pointer-events-none"}`}
      >
        <div className="flex flex-col gap-5 text-2xl *:hover:cursor-pointer ">
          {!user ? (
            <Link to={"/login"} className="w-fit" tabIndex={openNav ? 0 : -1}>
              Login
            </Link>
          ) : null}
          <Link to={"/"} className="w-fit" tabIndex={openNav ? 0 : -1}>
            Home
          </Link>
          <button className="w-fit" tabIndex={openNav ? 0 : -1}>
            My Post
          </button>
          <button className="w-fit" tabIndex={openNav ? 0 : -1}>
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
