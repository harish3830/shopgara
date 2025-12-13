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

router.use(protect, requireRole("admin"));

router.get("/vendor-requests", getVendorRequests);
router.put("/vendors/:id/approve", approveVendor);
router.get("/vendors", getAllVendors);

router.get("/orders/pending", getPendingOrders);
router.put("/orders/:id/assign", assignOrderToVendor);
router.put("/vendors/:id/revoke", protect,requireRole("admin"), revokeVendor);

router.get("/summary", getAdminSummary);

export default router;
