import { Router } from "express";
import {
  getRestaurantOrders,
  createRestaurant,
  addProductsToRestaurant,
  getRestaurantProducts,
  getManyRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "./restaurant.controller";

const router = Router();

router.post("/", createRestaurant);
router.get("/", getManyRestaurants);
router.get("/:id/orders", getRestaurantOrders);
router.post("/:id/products", addProductsToRestaurant);
router.get("/:id/products", getRestaurantProducts);
router.get("/:id", getRestaurant);

router.patch("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;