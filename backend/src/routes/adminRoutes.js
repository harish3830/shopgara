import express from "express";
import {
  getVendorRequests,
  approveVendor,
  revokeVendor,
  getAllVendors,
  getPendingOrders,
  assignOrderToVendor,
  getAdminSummary,
} from "../controllers/adminController.js";

import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

/* 🔐 ADMIN PROTECTION — APPLIES TO ALL ROUTES BELOW */
router.use(protect, requireRole("admin"));

/* ---------------- VENDORS ---------------- */
router.get("/vendor-requests", getVendorRequests);
router.put("/vendors/:id/approve", approveVendor);
router.put("/vendors/:id/revoke", revokeVendor);
router.get("/vendors", getAllVendors);

/* ---------------- ORDERS ---------------- */
router.get("/orders/pending", getPendingOrders);
router.put("/orders/:id/assign", assignOrderToVendor);

/* ---------------- DASHBOARD ---------------- */
router.get("/summary", getAdminSummary);

export default router;
