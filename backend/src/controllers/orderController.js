import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, qty }]

    if (!items || !items.length) {
      return res.status(400).json({ message: "No items in order" });
    }

    let total = 0;
    const orderItems = [];

    for (const it of items) {
      const product = await Product.findById(it.productId);
      if (!product) continue;

      const qty = it.qty || 1;
      total += product.price * qty;

      orderItems.push({
        product: product._id,
        name: product.name,
        qty,
        price: product.price,
      });
    }

    const order = await Order.create({
      customer: req.user._id,
      items: orderItems,
      totalAmount: total,
      status: "pendingAdmin",
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).sort("-createdAt");
  res.json(orders);
};

export const getVendorOrders = async (req, res) => {
  const orders = await Order.find({ vendor: req.user._id }).sort("-createdAt");
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      vendor: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { status } = req.body;
    const allowed = ["accepted", "packed", "shipped", "delivered"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
