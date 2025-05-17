import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(cors());
const PORT = process.env.PORT || "";

app.use("/auth", authRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MONGODB connected");
    app.listen(PORT, () => {
      console.log("server running on 8080");
    });
  })
  .catch((err) => {
    console.log("database connection failed", err);
  });
