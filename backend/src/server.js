import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import imagekitRoutes from "./routes/imagekitRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

/* -------------------- CORS -------------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shopgara.vercel.app" // frontend domain (change later)
    ],
    credentials: true,
  })
);

/* -------------------- BODY PARSER -------------------- */
app.use(express.json());

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/imagekit", imagekitRoutes);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.send("ShopGara API running 🚀");
});

/* -------------------- ERROR HANDLERS -------------------- */
app.use(notFound);
app.use(errorHandler);

/* -------------------- DB CONNECT -------------------- */
connectDB();

/* -------------------- EXPORT FOR VERCEL -------------------- */
export default app;
