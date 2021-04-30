import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import path from "path";
import mongoose from "mongoose";
import User from "./models/userModels";
import Product from "./models/productModels";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { notFound } from "./controllers/errorControllers";
import dotenv from "dotenv";
import products from "./data/products";
import multer from "multer";

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

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

if (process.env.NODE_ENV === "production") {
  const pathFrontend = path.join(__dirname, "..", "..", "frontend/build");

  app.use(express.static(pathFrontend));
  app.get("*", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.resolve(pathFrontend, "index.html"));
  });
} else {
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send(`API is running on ${process.env.POST}`);
  });
}

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
