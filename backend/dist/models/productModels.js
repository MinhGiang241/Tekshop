"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    image: [
        {
            type: String,
            require: true,
        },
    ],
    brand: {
        type: String,
        require: true,
    },
    screen: {
        type: String,
        require: true,
        default: "Chưa cập nhật",
    },
    CPU: {
        type: String,
        require: true,
        default: "Chưa cập nhật",
    },
    mainCamera: {
        type: String,
        require: true,
        default: "Chưa cập nhật",
    },
    selfieCamera: {
        type: String,
        require: true,
        default: "Chưa cập nhật",
    },
    hdd: {
        type: String,
        require: true,
        default: "Chưa cập nhật",
    },
    RAM: {
        type: String,
        require: true,
        default: "Chưa cập nhật",
    },
    category: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    timeRelease: {
        type: String,
        require: true,
    },
    battery: {
        type: String,
        require: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        require: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        require: true,
        default: 0,
    },
    price: {
        type: String,
        require: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        require: true,
        default: 0,
    },
}, {
    timestamps: true,
});
const Reviews = mongoose_1.default.model("review", reviewSchema);
productSchema.methods.addReview = function (name, comment) {
    const newReview = new Reviews();
    newReview.name = name;
    newReview.comment = comment;
    newReview.rating = 5;
    console.log("newReview", newReview);
    const newReviews = [...this.reviews, newReview];
    this.reviews = newReviews;
    this.numReviews = this.numReviews + 1;
    return this.save();
};
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
