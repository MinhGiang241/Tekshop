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
    orderItems: [
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
                type: String,
                require: true,
            },
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                require: true,
                ref: "Product",
            },
        },
    ],
    nameOrder: {
        type: String,
        require: true,
    },
    shippingAddress: {
        address: {
            type: String,
            require: true,
        },
        province: {
            type: String,
            require: true,
        },
        district: {
            type: String,
            require: true,
        },
        ward: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
    },
    paymentMethod: {
        method: {
            type: String,
            require: true,
        },
        visa: {
            nameCard: { type: String, require: true },
            cardNumber: { type: String, require: true },
            expire: { type: String, require: true },
            cvv: { type: String, require: true },
        },
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
        type: Boolean,
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
