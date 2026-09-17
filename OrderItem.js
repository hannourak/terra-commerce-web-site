import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    get() {
      const val = this.getDataValue("price");
      return val === null ? null : parseFloat(val);
    },
  },
});

export default OrderItem;