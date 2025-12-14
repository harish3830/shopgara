import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

/* ---------------- VENDOR REQUESTS ---------------- */
export const getVendorRequests = async (req, res, next) => {
  try {
    const vendors = await User.find({
      role: "vendor",
      isApproved: false,
    }).select("-password");

    res.json(vendors);
  } catch (err) {
    next(err);
  }
};

/* ---------------- APPROVE VENDOR ---------------- */
export const approveVendor = async (req, res, next) => {
  try {
    const vendor = await User.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: "User not found" });
    }

    vendor.role = "vendor";
    vendor.isApproved = true;
    await vendor.save();

    res.json({ message: "Vendor approved", vendor });
  } catch (err) {
    next(err);
  }
};

/* ---------------- REVOKE VENDOR ---------------- */
export const revokeVendor = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        message: "Admin role cannot be revoked",
      });
    }

    user.role = "customer";
    user.isApproved = false;
    await user.save();

    res.json({
      message: "Vendor role revoked",
      user,
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------- ALL VENDORS ---------------- */
export const getAllVendors = async (req, res, next) => {
  try {
    const vendors = await User.find({
      role: "vendor",
      isApproved: true,
    }).select("-password");

    res.json(vendors);
  } catch (err) {
    next(err);
  }
};

/* ---------------- PENDING ORDERS ---------------- */
export const getPendingOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: "pendingAdmin" })
      .populate("customer", "name email")
      .sort("-createdAt");

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

/* ---------------- ASSIGN ORDER ---------------- */
export const assignOrderToVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const vendor = await User.findById(vendorId);
    if (!vendor || vendor.role !== "vendor" || !vendor.isApproved) {
      return res.status(400).json({ message: "Invalid vendor" });
    }

    order.vendor = vendor._id;
    order.status = "assignedToVendor";
    await order.save();

    res.json({ message: "Order assigned", order });
  } catch (err) {
    next(err);
  }
};

/* ---------------- ADMIN SUMMARY ---------------- */
export const getAdminSummary = async (req, res, next) => {
  try {
    const totalVendors = await User.countDocuments({
      role: "vendor",
      isApproved: true,
    });

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      {
        $match: {
          status: {
            $in: [
              "assignedToVendor",
              "accepted",
              "packed",
              "shipped",
              "delivered",
            ],
          },
        },
      },
      { $group: { _id: null, sum: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueAgg[0]?.sum || 0;

    res.json({
      totalVendors,
      totalProducts,
      totalOrders,
      totalRevenue,
    });
  } catch (err) {
    next(err);
  }
};
