import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

/* CONNECT DB ONCE */
connectDB();

/* Middleware */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shopgara.vercel.app",
      "https://shopgara-42mi.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

/* Routes */
app.get("/", (req, res) => {
  res.send("ShopGara API running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/imagekit", imagekitRoutes);

/* Errors */
app.use(notFound);
app.use(errorHandler);

export default app;
