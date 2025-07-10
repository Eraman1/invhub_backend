import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getSubProductsByProductId,
  getSingleSubProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Product routes
router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Sub-product routes
router.get("/:id/sub-products", getSubProductsByProductId); // All sub-products of a product
router.get("/:productId/sub-products/:subProductId", getSingleSubProduct); // Single sub-product

export default router;
