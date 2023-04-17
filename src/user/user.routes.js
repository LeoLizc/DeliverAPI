import { createUser, deleteUser, getUsers, patchUser } from "./user.controller";
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getUsers);

// Endpoint POST /prueba
router.post('/', createUser);

// Endpoint PATCH /prueba
router.patch('/', patchUser);

// Endpoint DELETE /prueba
router.delete('/:id', deleteUser);

export default router;