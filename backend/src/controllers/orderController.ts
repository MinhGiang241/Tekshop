import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/userModels";
import Order from "../models/ordersModels";
import generateToken from "../utils/generateToken";
import { sendWelcomeEmail } from "../utils/sendMail";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find().populate("user", "id name");
    res.json(orders);
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "id name email"
    );
    res.json(order);
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addOrdersItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      nameOrder,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new Order({
        orderItems,
        user: (req as any).userId,
        shippingAddress,
        paymentMethod,
        totalPrice,
        nameOrder,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;
    const orders = await Order.find({
      user: userId,
    }).populate("user", "name email avatar");
    res.json(orders);
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).userId;
    const orderId = req.params.id;
    await Order.findOneAndDelete({
      _id: orderId,
      user: userId,
    });
    const orders = await Order.find({ user: userId }).populate(
      "user",
      "name email avatar"
    );
    res.json(orders);
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
