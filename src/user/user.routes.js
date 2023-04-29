import { signup, login, deleteUser, getUsers, patchUser, getAddresses } from "./user.controller";
import { Router } from 'express';
const router = Router();

router.post('/signup', signup);//? SIGN UP?
router.post('/login', login);
router.get('/:id/addresses', getAddresses);


// Endpoint GET /prueba
router.get('/', getUsers);

// Endpoint PATCH /prueba
router.patch('/:id', patchUser);

// Endpoint DELETE /prueba
router.delete('/:id', deleteUser);

// ? THINK about get the orders of a user
router.get('/:id/orders', (req, res) => {
  res.send("Endpoint to get all orders from a user not implemented yet");
});

export default router;