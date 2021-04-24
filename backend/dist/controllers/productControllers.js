"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReviews = exports.getProduct = exports.getAllProducts = void 0;
const productModels_1 = __importDefault(require("../models/productModels"));
const getAllProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(process.env.PER_PAGE);
        const products = await productModels_1.default.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
        if (!products) {
            res.status(404);
            const error = new Error("Products not found");
            throw error;
        }
        const count = await productModels_1.default.estimatedDocumentCount();
        res.json({ products, count });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getAllProducts = getAllProducts;
const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productModels_1.default.findById(id);
        if (!product) {
            res.status(404);
            const error = new Error("Products not found");
            throw error;
        }
        res.json(product);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getProduct = getProduct;
const postReviews = async (req, res, next) => {
    try {
        const { name, comment } = req.body;
        const id = req.params.id;
        const product = await productModels_1.default.findById(id);
        if (!product) {
            res.status(404);
            const error = new Error("Products not found");
            throw error;
        }
        await product.addReview(name, comment);
        return res.json(product);
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.postReviews = postReviews;
