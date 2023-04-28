import { signup, login, deleteUser, getUsers, patchUser } from "./user.controller";
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getUsers);

// Endpoint POST /prueba
router.post('/signup', signup);//? SIGN UP?

// Endpoint PATCH /prueba
router.patch('/:id', patchUser);

// Endpoint DELETE /prueba
router.delete('/:id', deleteUser);

// ? THINK about get the orders of a user
router.get('/:id/orders', (req, res) => {
  res.send("Endpoint to get all orders from a user not implemented yet");
});

// TODO THINK about LOGIN and SIGN UP
router.post('/login', login);

export default router;