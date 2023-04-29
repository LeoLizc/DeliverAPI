import { Router } from "express";
import {
  createOrder,
  updateOrder,
  getManyOrders,
  updateOrderStatus,
  getOrder,
  getSentOrders,
} from "./order.controller";

const router = Router();

router.get("/", getManyOrders);
router.post("/", createOrder);
router.get('/sent', getSentOrders);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);
router.patch("/:id/status", updateOrderStatus);

router.delete("/:id", (req, res) => {
  res.send("Endpoint to delete an order not implemented yet");
});

export default router;