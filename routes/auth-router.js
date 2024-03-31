import { Router } from 'express';
import { body } from 'express-validator';
import authController from '../controllers/auth-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 7, max: 32 }).withMessage('must be at least 7 chars long'),
  authController.registration
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.initSession);

router.get('/refresh', authController.refresh);

export default router;
