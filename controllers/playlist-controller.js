import playlistService from '../service/playlist-service.js';

class PlaylistController {
  async getPlaylistById(req, res, next) {
    try {
      const playlist = await playlistService.getPlaylistById(req.params.id);

      return res.status(200).json(playlist);
    } catch (e) {
      next(e);
    }
  }
}

export default new PlaylistController();
