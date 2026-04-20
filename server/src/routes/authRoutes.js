import { Router } from 'express';
import { login, logout, me } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { loginSchema } from '../validators/authValidators.js';

const router = Router();
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);
export default router;
