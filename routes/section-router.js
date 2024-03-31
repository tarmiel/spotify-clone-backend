import { Router } from 'express';
import sectionController from '../controllers/section-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

router.get('/', sectionController.getHomeSections);
router.get('/shorts', authMiddleware, sectionController.getShortsSection);
router.get('/preview', sectionController.getPreviewSections);

export default router;
