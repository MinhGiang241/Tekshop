"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    orderItem: [
        {
            name: {
                type: String,
                require: true,
            },
            quantity: {
                type: Number,
                require: true,
            },
            image: {
                type: String,
                require: true,
            },
            price: {
                type: Number,
                require: true,
            },
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                require: true,
                ref: "Product",
            },
        },
    ],
    shippingAddress: {
        address: {
            type: String,
            require: true,
        },
        city: {
            type: String,
            require: true,
        },
        postalCode: {
            type: String,
            require: true,
        },
        country: {
            type: String,
            require: true,
        },
    },
    paymentMethod: {
        type: String,
        require: true,
    },
    paymentResult: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        update_time: {
            type: String,
        },
        email_address: {
            type: String,
        },
    },
    taxPrice: {
        type: Number,
        require: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        require: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        require: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        require: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Number,
        require: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
