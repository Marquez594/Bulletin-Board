import { useEffect, useState } from "react";
import AddNew from "../component/add";
import Nav from "../component/nav";

type PostType = {
  title?: string;
  content?: string;
  uid?: number;
  users?: {
    username: string;
  };
};

type UserType = {
  firstname: string;
  lastname: string;
  username: string;
};

function Home() {
  const [post, setPost] = useState<PostType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const fetchPost = async () => {
    const res = await fetch("http://localhost:3000/api/getPost");
    const data = await res.json();
    if (res.ok) {
      setPost(data);
    }
  };

  const getUser = async () => {
    const res = await fetch("http://localhost:3000/api/user", {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    fetchPost();
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#120121] ">
      <Nav user={user}></Nav>
      <AddNew fetchPost={fetchPost}></AddNew>
      <div className="border border-white p-10 min-h-screen w-full pl-20 grid grid-cols-5 gap-5">
        {post.map((post, index) => (
          <div
            key={index}
            className="text-white bg-[#2a1f36] p-2 py-4 flex flex-col gap-2 h-fit rounded-2xl"
          >
            <p className="text-gray-400 text-sm">
              {post.users ? post.users.username : "Anonymous"}
            </p>
            <h1 className="text-2xl">{post.title ? post.title : ""}</h1>
            <h1>{post.content ? post.content : ""}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
export type {UserType}