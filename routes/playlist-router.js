import { Router } from 'express';
import playlistController from '../controllers/playlist-controller.js';

const router = new Router();

router.get('/:id', playlistController.getPlaylistById);

export default router;
