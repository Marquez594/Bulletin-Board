import express from "express";
import supabase from "../db.js";

const getRouter = express.Router();

getRouter.get("/getPost", async (req, res) => {
  try {
    console.log("Fetching stuff");
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(username)")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default getRouter;
