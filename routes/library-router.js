import { Router } from 'express';
import libraryController from '../controllers/library-controller.js';

const router = new Router();

router.get('/', libraryController.getUserLibrary);
router.post('/create', libraryController.createNewPlaylist);
router.patch('/playlist/remove/:id', libraryController.removeFromLibrary);

export default router;
