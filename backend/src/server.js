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

// Error Middlewares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// ================= APP INIT =================
const app = express();

// ================= CONNECT DATABASE =================
connectDB();

// ================= CORS CONFIG (RENDER + VERCEL SAFE) =================
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, Postman, curl
      if (!origin) return callback(null, true);

      // Allow localhost (development)
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      // Allow ALL Vercel deployments (preview + production)
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // Block everything else
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: allow preflight requests
app.options("*", cors());

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
