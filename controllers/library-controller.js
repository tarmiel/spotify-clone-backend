import libraryService from '../service/library-service.js';
import playlistService from '../service/playlist-service.js';

class LibraryController {
  async getUserLibrary(req, res, next) {
    try {
      const userId = req.user.id;
      const library = await libraryService.getUserLibrary(userId);

      return res.status(200).json(library);
    } catch (e) {
      next(e);
    }
  }
  async addToLibrary(req, res, next) {
    try {
      const userId = req.user.id;
      const payload = req.body;
      const ress = await libraryService.addToLibrary(userId, payload);

      return res.status(201).json(ress);
    } catch (e) {
      next(e);
    }
  }
  async removeFromLibrary(req, res, next) {
    try {
      console.log('====');
      const userId = req.user.id;
      const playlistId = req.params.id;
      const ress = await libraryService.removeFromLibrary(userId, playlistId);

      return res.status(201).json(ress);
    } catch (e) {
      next(e);
    }
  }
  async createNewPlaylist(req, res, next) {
    try {
      const user = req.user;
      const playlistCount = req.body.count;
      const newPlaylist = await playlistService.createDefaultPlaylist(user, playlistCount);
      const newLibrary = await libraryService.addToLibrary(user.id, {
        id: newPlaylist._id,
        type: 'playlist',
        addedAt: { isoString: new Date().toISOString() },
        pinnable: true,
        pinned: false,
        name: newPlaylist.name,
        count: newPlaylist.tracks.total,
        image: newPlaylist.images[0],
        owner: {
          type: 'User',
          id: newPlaylist.owner.id,
          name: newPlaylist.owner.name,
        },
      });

      return res.status(201).json(newLibrary);
    } catch (e) {
      next(e);
    }
  }
}

export default new LibraryController();
