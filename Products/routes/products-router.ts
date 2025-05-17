import express from "express";
import {
  addProducts,
  deletedProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from "../controllers/product-controllers.ts";
import { productValidation } from "../middlewears/product-middlewear.ts";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductsById);
productsRouter.post("/", productValidation, addProducts);
productsRouter.patch("/:id", updateProduct);
productsRouter.delete("/:id", deletedProduct);

export default productsRouter;
