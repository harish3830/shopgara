import express from "express";
import {
  getAllProducts,
  addProduct,
  getMyProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTE — Get all products
router.get("/", getAllProducts);

// VENDOR ROUTES
router.post("/", protect, requireRole("vendor"),addProduct);
router.get("/my", protect, requireRole("vendor"), getMyProducts);

// NEW → UPDATE PRODUCT
router.put("/:id", protect, requireRole("vendor"), updateProduct);

// NEW → DELETE PRODUCT
router.delete("/:id", protect, requireRole("vendor"), deleteProduct);

export default router;
