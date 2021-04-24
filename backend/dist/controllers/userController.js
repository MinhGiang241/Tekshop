"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userClearCart = exports.userDeleteCartItem = exports.userAddToCart = exports.userGetCart = exports.userRegister = exports.userUpdateProfile = exports.userProfile = exports.userLogin = void 0;
const { validationResult } = require("express-validator");
const userModels_1 = __importDefault(require("../models/userModels"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const sendMail_1 = require("../utils/sendMail");
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req);
        const user = (await userModels_1.default.findOne({ email }));
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
            token: generateToken_1.default(user._id),
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.userLogin = userLogin;
const userProfile = async (req, res, next) => {
    try {
        const user = (await userModels_1.default.findById(req.userId));
        res.json({ ...user._doc });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.userProfile = userProfile;
const userUpdateProfile = async (req, res, next) => {
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
        const user = (await userModels_1.default.findById(req.userId));
        if (!user) {
            return res.status(404).json({
                error: "Tài khoản không tìm thấy",
            });
        }
        const updatedUser = await user.updateProfile(avatar, name, email, password);
        return res.json({
            ...updatedUser._doc,
            token: generateToken_1.default(updatedUser._id),
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.userUpdateProfile = userUpdateProfile;
const userRegister = async (req, res, next) => {
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
        const user = (await userModels_1.default.create({
            name,
            email,
            password,
            avatar,
        }));
        if (user) {
            sendMail_1.sendWelcomeEmail(email, name);
            return res
                .status(201)
                .json({ ...user._doc, token: generateToken_1.default(user._id) });
        }
        else {
            res.status(400);
            throw new Error("Invalid User data");
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.userRegister = userRegister;
const userGetCart = async (req, res, next) => {
    try {
        const user = (await userModels_1.default.findById(req.userId));
        if (!user) {
            return res.status(404).json({
                error: "Tài khoản không tồn tại",
            });
        }
        await user.getCart();
        const newUser = (await userModels_1.default.findById(req.userId)
            .select("cart")
            .populate("cart.items.productId", "image name price"));
        const cart = newUser.cart.items;
        const newCart = cart.map((i) => {
            return {
                image: i.productId.image[0],
                name: i.productId.name,
                price: i.productId.price,
                quantity: i.quantity,
                _id: i.productId._id,
            };
        });
        return res.status(200).json({ cart: newCart });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.userGetCart = userGetCart;
const userAddToCart = async (req, res, next) => {
    try {
        const { productId, qty } = req.body;
        const user = (await userModels_1.default.findById(req.userId));
        if (!user) {
            return res.status(404).json({
                error: "Tài khoản không tồn tại",
            });
        }
        await user.addToCart(productId, qty);
        const newUser = (await userModels_1.default.findById(req.userId)
            .select("cart")
            .populate("cart.items.productId", "image name price"));
        const cart = await newUser.cart.items;
        const newCart = cart.map((i) => ({
            image: i.productId.image[0],
            name: i.productId.name,
            price: i.productId.price,
            quantity: i.quantity,
            _id: i.productId._id,
        }));
        return res.status(200).json({ cart: newCart });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.userAddToCart = userAddToCart;
const userDeleteCartItem = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const user = (await userModels_1.default.findById(req.userId));
        if (!user) {
            return res.status(404).json({
                error: "Tài khoản không tồn tại",
            });
        }
        await user.deleteCartItem(productId);
        const updatedUser = (await userModels_1.default.findById(req.userId)
            .select("cart")
            .populate("cart.items.productId", "image name price"));
        const newCart = updatedUser.cart.items.map((i) => ({
            image: i.productId.image[0],
            name: i.productId.name,
            price: i.productId.price,
            quantity: i.quantity,
            _id: i.productId._id,
        }));
        return res.status(200).json({ cart: newCart });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.userDeleteCartItem = userDeleteCartItem;
const userClearCart = async (req, res, next) => {
    try {
        const user = (await userModels_1.default.findById(req.userId));
        if (!user) {
            return res.status(404).json({
                error: "Tài khoản không tồn tại",
            });
        }
        const updatedUser = await user.clearCart();
        return res.status(200).json({ cart: [] });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.userClearCart = userClearCart;
