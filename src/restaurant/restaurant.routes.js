import { Router } from "express";
import {
  getRestaurantOrders,
  createRestaurant,
  addProductsToRestaurant,
  getRestaurantProducts,
  getManyRestaurants
} from "./restaurant.controller";

const router = Router();

router.post("/", createRestaurant);
router.get("/", getManyRestaurants);
router.get("/:id/orders", getRestaurantOrders);
router.post("/:id/products", addProductsToRestaurant);
router.get("/:id/products", getRestaurantProducts);


router.get("/:id", (req, res) => {//? THINK about products
  res.send("Endpoint to get a restaurant not implemented yet");
});

router.patch("/:id", (req, res) => {
  res.send("Endpoint to patch a restaurant not implemented yet");
});

router.delete("/:id", (req, res) => {
  res.send("Endpoint to delete a restaurant not implemented yet");
});

export default router;