import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  qty: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // assigned by admin
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pendingAdmin",    // waiting admin approval
        "assignedToVendor",
        "accepted",
        "packed",
        "shipped",
        "delivered",
      ],
      default: "pendingAdmin",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
