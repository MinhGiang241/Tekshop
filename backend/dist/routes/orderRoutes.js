"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.get("/", isAuth_1.default, orderController_1.getAllOrders);
router.get("/user-orders", isAuth_1.default, orderController_1.getUserOrders);
router.post("/", isAuth_1.default, orderController_1.addOrdersItems);
router.get("/details/:id", isAuth_1.default, orderController_1.getOrderById);
router.delete("/details/:id", isAuth_1.default, orderController_1.deleteOrderById);
exports.default = router;
