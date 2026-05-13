import express from "express";
import router from "./routes/signup.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Message from home");
});

app.get("/get", (req, res) => {
  console.log("Hello from get");
});
app.use("/api/auth", router);

app.listen(3000, () => {
  console.log("Server is running");
});
