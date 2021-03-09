import { Request, Response, NextFunction } from "express";
const { validationResult } = require("express-validator");
import User from "../models/userModels";
import generateToken from "../utils/generateToken";
import { sendWelcomeEmail } from "../utils/sendMail";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    const user = (await User.findOne({ email })) as any;
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
      });
    }

    if (!user) {
      return res.status(404).json({
        validationErrors: [
          {
            value: email,
            msg: "Email không tìm thấy",
            param: "email",
          },
        ],
      });
    }
    if (!(await user.matchPassword(password))) {
      return res.status(404).json({
        validationErrors: [
          {
            value: password,
            msg: "Password không đúng",
            param: "password",
          },
        ],
      });
    }

    return res.status(200).json({
      ...user._doc,
      token: generateToken(user._id),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const userProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await User.findById((req as any).userId)) as any;

    res.json({ ...user._doc });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const userUpdateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, avatar } = req.body;
    const errors = validationResult(req);
    console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
        validationErrors: errors.array(),
      });
    }
    const user = (await User.findById((req as any).userId)) as any;
    if (!user) {
      return res.status(404).json({
        error: "Tài khoản không tìm thấy",
      });
    }
    const updatedUser = await user.updateProfile(avatar, name, email, password);
    return res.json({
      ...updatedUser._doc,
      token: generateToken(updatedUser._id),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, avatar } = req.body;
    // return console.log("avatar", (req as any).files);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
        validationErrors: errors.array(),
      });
    }
    const user = (await User.create({
      name,
      email,
      password,
      avatar,
    })) as any;
    if (user) {
      sendWelcomeEmail(email, name);
      return res
        .status(201)
        .json({ ...user._doc, token: generateToken(user._id) });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const userGetCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await User.findById((req as any).userId)
      .select("cart")
      .populate("cart.items.productId", "image name price")) as any;
    if (!user) {
      return res.status(404).json({
        error: "Tài khoản không tồn tại",
      });
    }

    const cart = await user.getCart();

    const newCart = cart.map((i: any) => {
      return {
        image: i.productId.image[0],
        name: i.productId.name,
        price: i.productId.price,
        quantity: i.quantity,
        _id: i.productId._id,
      };
    });
    return res.status(200).json({ cart: newCart });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const userAddToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, qty } = req.body;
    const user = (await User.findById((req as any).userId)) as any;
    if (!user) {
      return res.status(404).json({
        error: "Tài khoản không tồn tại",
      });
    }
    await user.addToCart(productId, qty);

    const newUser = (await User.findById((req as any).userId)
      .select("cart")
      .populate("cart.items.productId", "image name price")) as any;

    const cart = await newUser.cart.items;
    const newCart = cart.map((i: any) => ({
      image: i.productId.image[0],
      name: i.productId.name,
      price: i.productId.price,
      quantity: i.quantity,
      _id: i.productId._id,
    }));
    return res.status(200).json({ cart: newCart });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const userDeleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body;
    console.log("body", req.params);
    const user = (await User.findById((req as any).userId)) as any;

    if (!user) {
      return res.status(404).json({
        error: "Tài khoản không tồn tại",
      });
    }
    await user.deleteCartItem(productId);
    const updatedUser = (await User.findById((req as any).userId)
      .select("cart")
      .populate("cart.items.productId", "image name price")) as any;

    const newCart = updatedUser.cart.items.map((i: any) => ({
      image: i.productId.image[0],
      name: i.productId.name,
      price: i.productId.price,
      quantity: i.quantity,
      _id: i.productId._id,
    }));

    return res.status(200).json({ cart: newCart });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const userClearCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await User.findById((req as any).userId)) as any;
    if (!user) {
      return res.status(404).json({
        error: "Tài khoản không tồn tại",
      });
    }
    const updatedUser = await user.clearCart();

    return res.status(200).json({ cart: [] });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
