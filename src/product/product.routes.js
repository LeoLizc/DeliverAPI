import { Router } from "express";

const router = Router();

router.get("/:id", (req, res) => {
  res.send("Endpoint to get a product not implemented yet");
});

router.get("/", (req, res) => {
  res.send("Endpoint to get all products not implemented yet");
});

router.patch("/:id", (req, res) => {
  res.send("Endpoint to patch a product not implemented yet");
});

router.delete("/:id", (req, res) => {
  res.send("Endpoint to delete a product not implemented yet");
});

export default router;