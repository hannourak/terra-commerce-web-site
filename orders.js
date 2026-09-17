import express from "express";
import { Order, OrderItem, User } from "../models/index.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// POST /api/orders  (logged-in user creates an order from their cart)
router.post("/", protect, async (req, res) => {
  try {
    const { items, shippingAddress, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await Order.create({
      userId: req.user.id,
      fullName: shippingAddress.fullName,
      address: shippingAddress.address,
      city: shippingAddress.city,
      phone: shippingAddress.phone,
      total,
    });

    const orderItems = items.map((item) => ({
      orderId: order.id,
      productId: item.product,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/orders/mine  (logged-in user's own orders)
router.get("/mine", protect, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ model: OrderItem, as: "items" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders  (admin: all orders)
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderItem, as: "items" },
        { model: User, attributes: ["name", "email"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;