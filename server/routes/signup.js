import express from "express";
import supabase from "../db.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("🔥 HIT SIGNUP ROUTE");
  const { firstname, lastname, username, password } = req.body;

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: `${username}@app.local`,
      password,
      email_confirm: true,
    });

    if (error) {
      console.log("FIrst error", error)
      return res.status(400).json({ error: error.message });

    }

    const user = data.user;

    if (!user) {
      console.log("failed to make user")
      return res.status(400).json({ error: "Failed to create user" });
    }

    const { error: profileError } = await supabase.from("users").insert([
      {
        uid: user.id,
        firstname,
        lastname,
        username,
      },
    ]);
    if (profileError) {
      console.log("SUPABASE ERROR:", profileError);
      return res.status(400).json({ error: profileError.message });
    }
    return res.status(200).json({ message: "Correctly created user" });
  } catch (error) {
    console.log("1");
    return res.status(500).json({ error: error.message });
  }
});

export default router;
