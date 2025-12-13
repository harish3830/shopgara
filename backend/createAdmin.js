import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { User } from "./src/models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const name = "Admin";
    const email = "admin@shopgara.com";
    const password = "Admin123"; // plain password

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("❌ Admin already exists");
      process.exit(0);
    }

    // Do NOT hash the password here — let pre-save hook handle it
    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
      isApproved: true,
    });

    console.log("✅ Admin created:", admin);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
