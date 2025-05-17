import { customError } from "../../Error/error.ts";
import { Login, Signup } from "../services/auth-services.ts";

export const handleLogin = async (req, res) => {
  try {
    const body = req.body;
    const login = await Login(body);
    res.status(200).json({
      status: "success",
      message: "user loggedIn successfully",
      data: login,
    });
  } catch (error) {
    throw customError(res, error);
  }
};

export const handleSignUp = async (req, res) => {
  try {
    const body = req.body;
    const signup = await Signup(body);
    res.status(201).json({
      status: "success",
      data: signup,
      message: "user siged up successfully",
    });
  } catch (error) {
    throw customError(res, error);
  }
};
