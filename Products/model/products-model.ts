import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please enter Product name"],
      trim: true,
      minLength: 3,
      maxLength: 50,
      unique: true,
    },
    price: {
      type: String,
      required: [true, "please enter price"],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model("Product", productSchema);
