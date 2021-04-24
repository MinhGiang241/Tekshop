import express from "express";
import isAuth from "../middlewares/isAuth";
import {
  getAllOrders,
  getOrderById,
  addOrdersItems,
  getUserOrders,
  deleteOrderById,
} from "../controllers/orderController";

const router = express.Router();

router.get("/", isAuth, getAllOrders);
router.get("/user-orders", isAuth, getUserOrders);
router.post("/", isAuth, addOrdersItems);
router.get("/details/:id", isAuth, getOrderById);
router.delete("/details/:id", isAuth, deleteOrderById);

export default router;
