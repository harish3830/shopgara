// src/routes/vendorRoutes.js
import express from "express";
import { protect, requireRole } from "../middleware/authMiddleware.js";
import { getVendorDashboard } from "../controllers/vendorController.js";

const router = express.Router();

router.get("/dashboard", protect, requireRole("vendor"), getVendorDashboard);

export default router;
