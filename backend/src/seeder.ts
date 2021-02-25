import mongoose from "mongoose";
import users from "./data/users";
import products from "./data/products";
import User from "./models/userModels";
import Product from "./models/productModels";
import Order from "./models/ordersModels";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users as any);
    const adminUser = (createUsers as any)[0]._id;
    const sampleProducts = products.map((product: any) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts as any);

    console.log("Data Imported");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    if (process.argv[2] === "-d") {
      destroyData();
    } else {
      importData();
    }
  })
  .catch((err) => console.log(err));
