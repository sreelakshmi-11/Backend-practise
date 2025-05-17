import { Errors } from "../../Error/error.ts";
import { ProductModel } from "../model/products-model.ts";
import type { productType } from "../types/types.ts";

export const handleGetProducts = async () => {
  try {
    const products = await ProductModel.find().lean().sort({ createdAt: -1 });
    return products;
  } catch (error) {
    throw error;
  }
};

export const handleGetProductsById = async (id: string) => {
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error("product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

export const handleAddProducts = async ({
  name,
  price,
  category,
}: {
  name: string;
  price: string;
  category: string;
}) => {
  try {
    const product = await ProductModel.findOne({ name });
    if (product) {
      throw new Error("product already exists");
    }
    const newProduct = await ProductModel.create({ name, price, category });
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const handleUpdateProduct = async (
  id: string,
  body: productType
): Promise<productType> => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedProduct) {
      throw new Error("product does not exists");
    }
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export const handleDeleteProducts = async (id: string) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("product does not exists");
    }
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};
