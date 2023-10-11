import { Router } from 'express';
import {Login, Register, logout} from '../controllers/AuthController.js';
const router = Router();
router.post('/login', Login);
router.post('/register',Register)
router.post('/logout',logout)

export default router;