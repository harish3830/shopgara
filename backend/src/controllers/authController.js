import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // ✅ allow only valid roles from frontend
  const allowedRoles = ["customer", "vendor"];
  const finalRole = allowedRoles.includes(role) ? role : "customer";

  const user = await User.create({
    name,
    email,
    password,
    role: finalRole,
    isApproved: finalRole === "vendor" ? false : true,
  });

  res.status(201).json({
    message:
      finalRole === "vendor"
        ? "Vendor registration submitted for approval"
        : "User registered successfully",
  });
};


/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // 🔒 BLOCK UNAPPROVED USERS
  if (!user.isApproved && user.role !== "admin") {
    return res.status(403).json({
      message: "Account not approved or has been revoked by admin",
    });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    token: generateToken(user),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
    },
  });
};

/* ================= GET LOGGED USER ================= */
export const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    isApproved: req.user.isApproved,
  });
};

/* ================= CREATE ADMIN ================= */
export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const admin = await User.create({
    name,
    email,
    password,
    role: "admin",
    isApproved: true,
  });

  res.status(201).json({
    message: "Admin created successfully",
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
};

/* ================= GET ADMINS ================= */
export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" }).select("-password");
  res.json(admins);
};
