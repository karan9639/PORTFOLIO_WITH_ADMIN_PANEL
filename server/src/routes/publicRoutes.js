import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { getSiteData, createMessage } from '../controllers/publicController.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { messageSchema } from '../validators/publicValidators.js';

const router = Router();
const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many messages sent. Please try again later.' },
});

router.get('/site', getSiteData);
router.post('/messages', messageLimiter, validateBody(messageSchema), createMessage);
export default router;
