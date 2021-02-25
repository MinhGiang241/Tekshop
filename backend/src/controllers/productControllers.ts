import Product from "../models/productModels";
import { Request, Response, NextFunction } from "express";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(process.env.PER_PAGE as string);

    console.log(page, perPage);

    const products = await Product.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    if (!products) {
      res.status(404);
      const error = new Error("Products not found");
      throw error;
    }
    const count = await Product.count();
    res.json({ products, count });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      const error = new Error("Products not found");
      throw error;
    }

    res.json(product);
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};