import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getVendorDashboard = async (req, res) => {
  const products = await Product.find({ vendor: req.user._id });
  const orders = await Order.find({ vendor: req.user._id });

  const itemsSold = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0),
    0
  );

  const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  res.json({
    totalProducts: products.length,
    itemsSold,
    revenue,
    pendingOrders: orders.filter((o) => o.status !== "delivered").length,
    products,
    orders,
  });
};
