import Track from '../models/track-model.js';

class TrackService {
  async getTrackById(trackId) {
    const track = await Track.findById(trackId).populate('artists').populate('album');
    // .populate({ path: 'album', populate: 'artists' });

    return track;
  }
}

export default new TrackService();
