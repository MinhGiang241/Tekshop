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
    console.log(user);
    res.json({ ...user._doc });
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
    const { name, email, password, confirmPassword } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
      });
    }
    const user = (await User.create({
      name,
      email,
      password,
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
