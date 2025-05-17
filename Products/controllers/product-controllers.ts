import { customError } from "../../Error/error.ts";
import {
  handleAddProducts,
  handleDeleteProducts,
  handleGetProducts,
  handleGetProductsById,
  handleUpdateProduct,
} from "../services/product-services.ts";

export const getProducts = async (req, res) => {
  try {
    const products = await handleGetProducts();

    res.status(200).json({
      message: "products fetched successfully",
      status: "success",
      data: products,
    });
  } catch (error) {
    throw error;
  }
};
export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await handleGetProductsById(id);
    res.status(200).json({
      status: "success",
      message: "product fetched succesfully",
      data: product,
    });
  } catch (error) {
    throw error;
  }
};
export const addProducts = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await handleAddProducts({ name, price, category });
    res.status(201).json({
      status: "success",
      message: "product added successfully",
      data: product,
    });
  } catch (error) {
    throw error;
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const product = await handleUpdateProduct(id, body);
    res.status(200).json({
      status: "success",
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    throw customError(res, error);
  }
};
export const deletedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await handleDeleteProducts(id);
    res.status(200).json({
      message: "product deleted successfully",
      status: "success",
      data: product,
    });
  } catch (error) {
    throw customError(res, error);
  }
};
