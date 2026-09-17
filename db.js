import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? { require: true, rejectUnauthorized: false } : false,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`PostgreSQL connected: ${process.env.DB_NAME}@${process.env.DB_HOST}`);
  } catch (error) {
    console.error(`PostgreSQL connection error: ${error.message}`);
    process.exit(1);
  }
};

export default sequelize;