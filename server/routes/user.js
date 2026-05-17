import express from "express";
import supabase from "../db.js";

const userRouter = express.Router();

userRouter.get("/user", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not logged In" });
  }

  const { data: user, error } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("firstname,lastname,username")
    .single();

  if (profileError) {
    return res.status(401).json({ message: profileError.message });
  }

  return res.status(200).json(profile);
});

export default userRouter;
