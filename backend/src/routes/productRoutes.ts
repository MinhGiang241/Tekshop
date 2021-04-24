import express from "express";
import {
  getAllProducts,
  getProduct,
  postReviews,
} from "../controllers/productControllers";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.post("/review/:id", postReviews);

export default router;
