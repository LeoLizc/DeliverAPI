import { Router } from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
  updateManyProduct,
  deleteProduct,
  getManyProduct,
} from "./product.controller";

const router = Router();

router.post("/", createProduct);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.patch("/", updateManyProduct);
router.delete("/:id", deleteProduct);
router.get("/", getManyProduct);

export default router;