import {
  signup,
  login,
  deleteUser,
  getUsers,
  patchUser,
  getAddresses,
  addUserAddress,
  getUserOrders,
} from "./user.controller";
import { Router } from 'express';
const router = Router();

router.post('/signup', signup);//? SIGN UP?
router.post('/login', login);
router.get('/:id/addresses', getAddresses);

// Endpoint PATCH /prueba
router.patch('/:id', patchUser);

// Endpoint GET /prueba
router.get('/', getUsers);

// Endpoint DELETE /prueba
router.delete('/:id', deleteUser);
router.post('/:id/addresses', addUserAddress);
router.get('/:id/orders', getUserOrders);

export default router;