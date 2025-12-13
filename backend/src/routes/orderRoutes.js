import express from "express";
import {
  placeOrder,
  getMyOrders,
  getVendorOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// customer
router.post("/", protect, requireRole("customer"), placeOrder);
router.get("/my", protect, requireRole("customer"), getMyOrders);

router.get("/vendor/my", protect, requireRole("vendor"), getVendorOrders);
router.put("/vendor/:id/status", protect, requireRole("vendor"), updateOrderStatus);

export default router;
