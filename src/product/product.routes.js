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

router.get("/", getManyProduct);
router.post("/", createProduct);
router.patch("/", updateManyProduct);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;