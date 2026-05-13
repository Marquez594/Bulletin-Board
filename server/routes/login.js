import express from "express";
import supabase from "../db.js";

const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
  console.log("Login Process Started");
  const { username, password } = req.body;
  try {
    const email = `${username}@app.local`;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!data.session) {
      return res.status(400).json({ message: "Session not found" });
    }

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.cookie("token", data.session.access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "Logged In Success",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
