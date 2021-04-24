"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderById = exports.getUserOrders = exports.addOrdersItems = exports.getOrderById = exports.getAllOrders = void 0;
const ordersModels_1 = __importDefault(require("../models/ordersModels"));
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await ordersModels_1.default.find().populate("user", "id name");
        res.json(orders);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getAllOrders = getAllOrders;
const getOrderById = async (req, res, next) => {
    try {
        const order = await ordersModels_1.default.findById(req.params.id).populate("user", "id name email");
        res.json(order);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getOrderById = getOrderById;
const addOrdersItems = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice, nameOrder, } = req.body;
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("No order items");
        }
        else {
            const order = new ordersModels_1.default({
                orderItems,
                user: req.userId,
                shippingAddress,
                paymentMethod,
                totalPrice,
                nameOrder,
            });
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.addOrdersItems = addOrdersItems;
const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.userId;
        const orders = await ordersModels_1.default.find({
            user: userId,
        }).populate("user", "name email avatar");
        res.json(orders);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getUserOrders = getUserOrders;
const deleteOrderById = async (req, res, next) => {
    try {
        const userId = req.userId;
        const orderId = req.params.id;
        await ordersModels_1.default.findOneAndDelete({
            _id: orderId,
            user: userId,
        });
        const orders = await ordersModels_1.default.find({ user: userId }).populate("user", "name email avatar");
        res.json(orders);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.deleteOrderById = deleteOrderById;
