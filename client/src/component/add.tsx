import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type AddNewProps = {
  fetchPost: () => Promise<void>;
};

function AddNew({ fetchPost }: AddNewProps) {
  const [openAdd, setOpenAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    content: "",
  });

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAddForm({ ...addForm, [e.currentTarget.name]: e.currentTarget.value });
  };

  const addPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/addPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm),
    });
    const data = await res.json();

    if (res.ok) {
      console.log("WE DID IT");
      await fetchPost();
      setOpenAdd(false);
      setAddForm({
        title: "",
        content: "",
      });
    }
  };

  return (
    <div>
      {openAdd ? (
        <div className="w-1/2 h-1/2 fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#2a1f36] p-5 flex flex-col gap-5">
          <h1 className="text-white text-3xl">Create Post</h1>
          <form className="flex flex-col  gap-4 h-full" onSubmit={addPost} autoComplete="off">
            <input
              className="flex-1 bg-[#120121] p-3 text-white rounded-2xl"
              placeholder="Title"
              name="title"
              onChange={(e) => updateForm(e)}
              
            ></input>
            <textarea
              className="flex-4 bg-[#120121] p-3 text-white rounded-2xl resize-none"
              placeholder="Text"
              name="content"
              onChange={(e) => updateForm(e)}
            ></textarea>
            <div className="flex-1 flex gap-5 *:hover:cursor-pointer">
              <button
                className="bg-gray-600 flex-1 p-2 rounded-2xl text-white"
                onClick={() => {
                  setOpenAdd(false);
                  setAddForm({
                    title: "",
                    content: "",
                  });
                }}
              >
                Cancel
              </button>
              <button className="bg-pink-400 flex-1 p-2 rounded-2xl text-white">
                Add
              </button>
            </div>
          </form>
        </div>
      ) : null}
      <button
        className={`fixed w-15 h-15 bg-pink-400 right-5 bottom-5 flex justify-center items-center rounded-full hover:cursor-pointer transition-all ease-in-out duration-100 ${openAdd ? "rotate-45" : null}`}
        onClick={() => setOpenAdd(!openAdd)}
      >
        <FontAwesomeIcon icon={faPlus} className="scale-200"></FontAwesomeIcon>
      </button>
    </div>
  );
}

export default AddNew;
