import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Authentication failed: token not provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Authentication failed: user not found",
      });
    }

    // 🔒 BLOCK UNAPPROVED / REVOKED USERS
    if (!user.isApproved && user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied: account not approved",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed: invalid or expired token",
    });
  }
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        message: `Access denied: ${role} role required`,
      });
    }

    next();
  };
};
