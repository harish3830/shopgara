// ================= LOAD ENV FIRST =================
import dotenv from "dotenv";
dotenv.config();

// ================= IMPORTS =================
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import imagekitRoutes from "./routes/imagekitRoutes.js";

// Middlewares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// ================= APP INIT =================
const app = express();

// ================= CONNECT DATABASE =================
connectDB();

// ================= CORS CONFIG =================
const allowedOrigins = [
  "http://localhost:5173",
  "https://shopgara.vercel.app",
  "https://shopgara-42mi.vercel.app",
  "https://shopgara-a43j.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server & Postman
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ================= BODY PARSER =================
app.use(express.json());

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("ShopGara API running 🚀");
});

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/imagekit", imagekitRoutes);

// ================= ERROR HANDLING (LAST) =================
app.use(notFound);
app.use(errorHandler);

// ================= EXPORT =================
export default app;
