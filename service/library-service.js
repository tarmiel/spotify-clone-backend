import Library from '../models/library-model.js';
import Playlist from '../models/playlist-model.js';
import playlistService from './playlist-service.js';

class LibraryService {
  async getUserLibrary(userId) {
    const library = await Library.findOne({ userId: userId });

    return library;
  }
  async initLibrary(user) {
    const likedCollection = await Playlist.create({
      _id: user.id,
      name: 'Liked Songs',
      description: '',
      public: false,
      owner: {
        id: '65032efdf96dadff637b1e21',
        name: 'Oleg',
        type: 'User',
      },
      images: [
        {
          extractedColors: { colorDark: { hex: '#5018F0', isFallback: false } },
          sources: [
            { url: 'https://misc.scdn.co/liked-songs/liked-songs-64.png', width: 64, height: 64 },
            { url: 'https://misc.scdn.co/liked-songs/liked-songs-300.png', width: 300, height: 300 },
            { url: 'https://misc.scdn.co/liked-songs/liked-songs-640.png', width: 640, height: 640 },
          ],
        },
      ],
      tracks: {
        total: 0,
        offset: 0,
        limit: 25,
        items: [],
      },
    });

    console.log(likedCollection);

    const library = await Library.create({
      userId: user.id,
      availableFilters: [],
      availableSortOrders: [],
      pagingInfo: {
        offset: 0,
        limit: 10,
      },
      totalCount: 1,
      items: [
        {
          id: user.id,
          type: 'collection',
          addedAt: { isoString: new Date().toISOString() },
          pinnable: true,
          pinned: true,
          name: 'Liked Songs',
          count: 0,
          image: {
            extractedColors: { colorDark: { hex: '#5018F0', isFallback: false } },
            sources: [
              { url: 'https://misc.scdn.co/liked-songs/liked-songs-64.png', width: 64, height: 64 },
              { url: 'https://misc.scdn.co/liked-songs/liked-songs-300.png', width: 300, height: 300 },
              { url: 'https://misc.scdn.co/liked-songs/liked-songs-640.png', width: 640, height: 640 },
            ],
          },
          owner: {
            type: 'User',
            id: user.id,
            name: user.username,
          },
        },
      ],
    });

    return library;
  }
  async addToLibrary(userId, payload) {
    let library = await Library.findOne({ userId: userId });
    library.items.push(payload);
    library.totalCount = library.items.length;
    await Library.findOneAndUpdate({ userId: userId }, library);

    return library;
  }
  async removeFromLibrary(userId, playlistId) {
    let library = await Library.findOne({ userId: userId });

    const newItems = library.items.filter((item) => item.id.toString() !== playlistId);
    library.items = newItems;
    library.totalCount = newItems.length;

    await Library.findOneAndUpdate({ userId: userId }, library);

    let removedPlaylist = playlistService.deletePlaylist(playlistId);

    return library;
  }
}

export default new LibraryService();
