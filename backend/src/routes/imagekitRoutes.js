import express from "express";
import imagekit from "../config/imagekit.js";

const router = express.Router();

router.get("/auth", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

export default router;
