import { Router } from "express";
import {
  createOrder,
  updateOrder,
  getManyOrders,
  updateOrderStatus,
  getOrder,
  getSentOrders,
  deleteOrder,
} from "./order.controller";

const router = Router();

router.get("/", getManyOrders);
router.post("/", createOrder);
router.get('/sent', getSentOrders);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.patch("/:id/status", updateOrderStatus);

router.delete("/:id", deleteOrder);

export default router;