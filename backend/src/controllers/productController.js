import Product from "../models/Product.js";

// Add product (vendor)
export const addProduct = async (req, res, next) => {
  try {
    const { name, category, price, stock = 0, description, imageUrl } = req.body;

    if (!name || !category || !price) {
      return res
        .status(400)
        .json({ message: "Name, category and price are required" });
    }

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      description,
      imageUrl,
      vendor: req.user._id,
    });

    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Vendor products
export const getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      vendor: req.user._id,
    }).sort("-createdAt");

    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort("-createdAt");
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Update product
export const updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, vendor: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Not authorized or product not found" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user._id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Not authorized or product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
