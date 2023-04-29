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

router.get('/sent', getSentOrders);
router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.get("/", getManyOrders);
router.patch("/:id/status", updateOrderStatus);
router.get("/:id", getOrder);

router.delete("/:id", (req, res) => {
  res.send("Endpoint to delete an order not implemented yet");
});

export default router;