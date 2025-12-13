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

/* Middleware */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

/* Routes */
app.get("/", async (req, res) => {
  await connectDB(); // connect ONLY when request comes
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
