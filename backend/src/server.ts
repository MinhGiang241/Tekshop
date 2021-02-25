import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import mongoose from "mongoose";
import User from "./models/userModels";
import Product from "./models/productModels";
import productRoutes from "./routes/productRoutes";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { notFound } from "./controllers/errorControllers";
import dotenv from "dotenv";
import products from "./data/products";

dotenv.config();

const POST = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(`API is running on ${process.env.POST}`);
});

app.use("/products", productRoutes);

app.use(notFound);

app.use(((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const stack = err.stack;
  res.status(status).json({ message, stack });
}) as ErrorRequestHandler);

connectDB()
  .then(() => {
    app.listen(POST, () => {
      console.log(
        `server is running in ${process.env.NODE_ENV} up on ${process.env.POST}`
      );
      console.log(process.env.MONGO_USER);
    });
  })
  .catch((err) => {
    console.log(err);
  });
