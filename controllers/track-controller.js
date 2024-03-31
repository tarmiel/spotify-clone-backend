import trackService from '../service/track-service.js';

class TrackController {
  async getAllTracks(req, res, next) {
    try {
      return res.status(200).json([]);
    } catch (e) {
      next(e);
    }
  }
  async getTrackById(req, res, next) {
    try {
      const track = await trackService.getTrackById(req.params.id);

      return res.status(200).json(track);
    } catch (e) {
      next(e);
    }
  }
}

export default new TrackController();
