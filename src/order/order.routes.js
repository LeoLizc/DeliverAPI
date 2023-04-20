import { Router } from "express";

const router = Router();

router.get("/:id", (req, res) => {
  res.send("Endpoint to get an order not implemented yet");
});

router.get("/", (req, res) => {
  res.send("Endpoint to get all orders not implemented yet");
});

router.get('/not-accepted', (req, res) => {
  res.send("Endpoint to get all orders not accepted not implemented yet");
});

router.post("/", (req, res) => {
  res.send("Endpoint to create an order not implemented yet");
});

router.patch("/:id", (req, res) => {
  res.send("Endpoint to patch an order not implemented yet");
});

//? THINK about and endpoint to specificly change the status of an order
router.patch("/:id/status", (req, res) => {
    res.send("Endpoint to patch the status of an order not implemented yet");
});

router.delete("/:id", (req, res) => {
  res.send("Endpoint to delete an order not implemented yet");
});

export default router;