import sequelize from "../config/db.js";
import Product from "./Product.js";
import User from "./User.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";

// Associations
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

export const syncDB = async () => {
  await sequelize.sync(); // creates tables if they don't exist yet
  console.log("Database tables synced");
};

export { Product, User, Order, OrderItem };