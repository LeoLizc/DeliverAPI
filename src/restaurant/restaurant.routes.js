import { Router } from "express";

const router = Router();

router.get("/:id", (req, res) => {
  res.send("Endpoint to get a restaurant not implemented yet");
});

router.get("/", (req, res) => {
  res.send("Endpoint to get all restaurants not implemented yet");
});

router.post("/", (req, res) => {
  res.send("Endpoint to create a restaurant not implemented yet");
});

router.patch("/:id", (req, res) => {
  res.send("Endpoint to patch a restaurant not implemented yet");
});

router.delete("/:id", (req, res) => {
  res.send("Endpoint to delete a restaurant not implemented yet");
});

export default router;