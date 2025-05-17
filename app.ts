import express from "express";
import productsRouter from "./Products/routes/products-router.ts";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRouter from "./auth/routes/auth-routes.ts";

const app = express();
dotenv.config();
const PORT =process.env.PORT|| 8080;
const MONGODB_URI=process.env.MONGODB_URI || ""


app.use(express.json());
app.use("/products", productsRouter);
app.use('/auth',authRouter)
app.get("/", (req, res) => {
  res.send("hello backend");
});


if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not defined in .env");
} 
mongoose.connect(MONGODB_URI).
then(()=>{
  console.log("connected to MONGODB")
  app.listen(PORT, () => {
    console.log("server running on port 8080");
  });
})
.catch((error)=>{
console.error("MONGODB connection error",error)
})

