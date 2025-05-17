import express from "express";
import { handleLogin, handleSignUp } from "../controller/auth-controller.ts";
import {
  loginValidation,
  signUpValidation,
} from "../middlewears/auth-middlewear.ts";

const authRouter = express.Router();

authRouter.post("/login", loginValidation, handleLogin);
authRouter.post("/signup", signUpValidation, handleSignUp);

export default authRouter;
