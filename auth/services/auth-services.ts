import { UserModel } from "../model/auth-model.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { userType } from "../types/types.ts";
import { Errors } from "../../Error/error.ts";

export const Login = async (body: userType) => {
  try {
    const { email, password } = body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Errors("user doesn't exists,Please sign up", 404);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Errors("password doesn't match", 401);
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_STR,
      { expiresIn: "2h" }
    );
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    };
  } catch (error) {
    throw error;
  }
};

export const Signup = async (body: userType) => {
  try {
    const { name, email, password } = body;
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Errors("user already exists", 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.SECRET_STR,
      { expiresIn: "2h" }
    );
    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token,
    };
  } catch (error) {
    throw error;
  }
};
