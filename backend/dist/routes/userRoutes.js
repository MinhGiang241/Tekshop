"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { check, body } = require("express-validator");
const userModels_1 = __importDefault(require("../models/userModels"));
const userController_1 = require("../controllers/userController");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = express_1.default.Router();
router.get("/cart", isAuth_1.default, userController_1.userGetCart);
router.post("/cart", isAuth_1.default, userController_1.userAddToCart);
router.put("/cart", isAuth_1.default, userController_1.userDeleteCartItem);
router.delete("/cart", isAuth_1.default, userController_1.userClearCart);
router.put("/profile", isAuth_1.default, userController_1.userUpdateProfile);
router.post("/register", [
    check("name").trim().notEmpty().withMessage("Tên không được để trống"),
    check("email")
        .trim()
        .isEmail()
        .withMessage("email không đúng")
        .normalizeEmail()
        .notEmpty()
        .withMessage("email không được để trống")
        .custom(async (value, { req }) => {
        const existedUser = await userModels_1.default.findOne({ email: value });
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
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords không khớp!");
        }
        return true;
    }),
], userController_1.userRegister);
router.post("/login", [
    check("email").trim().isEmail().withMessage("Email không hợp lệ"),
    check("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Password ít nhất 5 ký tự"),
], userController_1.userLogin);
router.get("/profile", isAuth_1.default, userController_1.userProfile);
router.post("/profile", isAuth_1.default, [
    body("name").trim().notEmpty().withMessage("Tên không được để trống"),
    body("email")
        .trim()
        .isEmail()
        .withMessage("email không đúng")
        .normalizeEmail()
        .custom(async (value, { req }) => {
        const existedUser = (await userModels_1.default.findOne({
            email: value,
            _id: { $ne: req.userId },
        }));
        if (existedUser) {
            throw new Error("Email đã tồn tại");
        }
        return true;
    }),
    body("password")
        .isLength({ min: 5 })
        .withMessage("Password ít nhất 5 ký tự"),
], userController_1.userUpdateProfile);
exports.default = router;
