import express from "express";
const { check, body } = require("express-validator");
import User from "../models/userModels";

import {
  userLogin,
  userProfile,
  userRegister,
} from "../controllers/userController";
import isAuth from "../middlewares/isAuth";

const router = express.Router();

router.post(
  "/register",
  [
    check("name").trim().notEmpty().withMessage("Tên không được để trống"),
    check("email")
      .trim()
      .isEmail()
      .withMessage("email không đúng")
      .normalizeEmail()
      .custom(async (value: any, { req }: any) => {
        const existedUser = await User.findOne({ email: value });
        if (existedUser) {
          throw new Error("Email đã tồn tại");
        }
        return true;
      }),
    check("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password ít nhất 5 ký tự"),
    check("confirmPassword")
      .trim()
      .custom((value: any, { req }: any) => {
        if (value !== req.body.password) {
          throw new Error("Passwords không khớp!");
        }
        return true;
      }),
  ],
  userRegister
);
router.post(
  "/login",
  [
    check("email").trim().isEmail().withMessage("Email không hợp lệ"),
    check("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password ít nhất 5 ký tự"),
  ],
  userLogin
);
router.get("/profile", isAuth, userProfile);

export default router;
