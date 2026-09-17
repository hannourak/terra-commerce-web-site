import express from "express";
import { Op } from "sequelize";
import { Product } from "../models/index.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/products  (supports ?category=&search=)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const where = {};
    if (category) where.category = category;
    if (search) where.name = { [Op.iLike]: `%${search}%` };

    const products = await Product.findAll({ where, order: [["createdAt", "DESC"]] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/products  (admin only)
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/products/:id  (admin only)
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/products/:id  (admin only)
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;