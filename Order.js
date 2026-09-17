import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    get() {
      const val = this.getDataValue("total");
      return val === null ? null : parseFloat(val);
    },
  },
  status: {
    type: DataTypes.ENUM("pending", "processing", "shipped", "delivered"),
    defaultValue: "pending",
  },
});

export default Order;