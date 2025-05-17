import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    trim: true,
    minLength: [3, "name must be at least 3 characters"],
    maxLength: [50, "name must have at most 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
});

export const UserModel = mongoose.model("User", userSchema);
