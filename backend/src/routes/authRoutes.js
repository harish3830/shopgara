import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";
import { createAdmin, getAdmins } from "../controllers/authController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/create-admin", protect, requireRole("admin"), createAdmin);
router.get("/admins", protect, requireRole("admin"), getAdmins);
export default router;
