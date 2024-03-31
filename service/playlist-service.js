import { isValidObjectId } from 'mongoose';
import Playlist from '../models/playlist-model.js';
import ApiError from '../errors/api-error.js';

class PlaylistService {
  async getPlaylistById(playlistId) {
    if (!isValidObjectId(playlistId)) throw ApiError.BadRequest('Invalid playlist ID');

    const playlist = await Playlist.findById(playlistId).populate({
      path: 'tracks',
      populate: { path: 'items', populate: ['artists', 'album'] },
    });

    return playlist;
  }
  async createDefaultPlaylist(owner, number) {
    const playlist = await Playlist.create({
      name: `My Playlist #${number + 1}`,
      description: '',
      public: false,
      owner: {
        id: owner.id,
        name: owner.username,
        type: 'User',
      },
      images: [],
      tracks: {
        total: 0,
        offset: 0,
        limit: 25,
        items: [],
      },
    });

    return playlist;
  }
  async deletePlaylist(playlistId) {
    const removedPlaylist = await Playlist.findByIdAndDelete(playlistId);
    return removedPlaylist;
  }
}

export default new PlaylistService();
