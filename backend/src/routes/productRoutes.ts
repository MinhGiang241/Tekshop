import express from "express";
import { getAllProducts, getProduct } from "../controllers/productControllers";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProduct);

export default router;
