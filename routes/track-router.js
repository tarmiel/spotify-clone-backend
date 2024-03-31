import { Router } from 'express';
import trackController from '../controllers/track-controller.js';

const router = new Router();

router.get('/', trackController.getAllTracks);
router.get('/:id', trackController.getTrackById);

export default router;
