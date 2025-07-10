import Product from "../models/product.model.js";

// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ONLY SUB PRODUCTS OF A PRODUCT
export const getSubProductsByProductId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("subProducts");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product.subProducts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET A SPECIFIC SUB PRODUCT
export const getSingleSubProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const subProduct = product.subProducts.id(req.params.subProductId);
    if (!subProduct)
      return res.status(404).json({ message: "Sub product not found" });

    res.json(subProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
