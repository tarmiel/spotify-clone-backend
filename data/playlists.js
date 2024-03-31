export const playlists = [
  {
    name: 'Skillet Radio',
    description: '',
    followers: 52335,
    public: true,
    owner: {
      id: '6525988f9c78ba30ecd1b77f',
      name: 'Skillet',
      type: 'Artist',
    },
    images: [
      {
        extractedColors: { colorDark: { hex: '#78C0B0', isFallback: false } },
        sources: [
          {
            url: 'https://seeded-session-images.scdn.co/v1/img/artist/49bzE5vRBRIota4qeHtQM8/en',
            width: null,
            height: null,
          },
        ],
      },
    ],
    tracks: {
      total: 50,
      offset: 0,
      limit: 25,
      items: ['6525991f67e6f44cb9636703', '6525991f67e6f44cb9636704', '6525991f67e6f44cb9636705'],
    },
  },
  {
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
      total: 3,
      offset: 0,
      limit: 25,
      items: ['6525991f67e6f44cb9636703', '6525991f67e6f44cb9636704', '6525991f67e6f44cb9636705'],
    },
  },
];
