import express from "express";
import supabase from "../db.js";

const addRouter = express.Router();

addRouter.post("/addPost", async (req, res) => {
  console.log("Adding Post");
  const { title, content } = req.body;
  try {
    const { error: profileError } = await supabase.from("posts").insert([
      {
        title,
        content,
      },
    ]);

    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }

    return res.status(200).json({message: "Post Created"})

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


export default addRouter