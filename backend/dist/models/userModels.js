"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false,
    },
    avatar: {
        type: Buffer,
        default: "data:image/png;base64,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",
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
}, {
    timestamps: true,
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
userSchema.methods.updateProfile = async function (avatar, name, email, password) {
    if (avatar) {
        this.avatar = avatar;
    }
    this.name = name;
    this.email = email;
    if (password !== "*****") {
        this.password = password;
    }
    return this.save();
};
userSchema.methods.getCart = function (productId) {
    return this.cart.items;
};
userSchema.methods.addToCart = function (productId, qty) {
    // check product exist in cart
    const cartItems = this.cart.items;
    const existedProductIndex = cartItems.findIndex((i) => i.productId.toString() === productId);
    const updatedCartItems = [...cartItems];
    // if exist quantity + qty
    if (existedProductIndex >= 0) {
        const updateQuantity = Number(qty) + parseFloat(updatedCartItems[existedProductIndex].quantity);
        updatedCartItems[existedProductIndex].quantity = updateQuantity;
    }
    else {
        // if not exist push new product in cart
        updatedCartItems.push({
            productId: productId,
            quantity: qty,
        });
    }
    // update cart
    this.cart = { items: updatedCartItems };
    return this.save();
};
userSchema.methods.deleteCartItem = function (productId) {
    const cartItems = this.cart.items;
    const updatedCartItems = [...cartItems];
    // check product exist in cart
    const existedProductIndex = cartItems.findIndex((i) => i.productId.toString() === productId);
    // if not exist return
    if (existedProductIndex < 0) {
        this.cart = { items: updatedCartItems };
        return this.save();
    }
    else {
        // if exist remove item
        const newUpdatedCartItems = updatedCartItems.filter((i) => i.productId.toString() !== productId);
        // update cart
        this.cart = { items: newUpdatedCartItems };
        return this.save();
    }
};
userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcryptjs_1.default.hash(user.password, 12);
    }
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
