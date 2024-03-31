import jwt from 'jsonwebtoken';
import tokenModel from '../models/token-model.js';
import Section from '../models/section-model.js';

class SectionService {
  async initSections(user) {
    const initShortsSection = {
      type: 'ShortsSection',
      title: 'Recently Played',
      items: [
        {
          _id: user.id,
          title: 'Liked Songs',
          type: 'Playlist',
          image: {
            sources: [
              { url: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png', width: null, height: null },
            ],
            extractedColors: { colorDark: { hex: '#647A85', isFallback: false } },
          },
          owner: { name: user.username, id: user.id, type: 'User' },
        },
        {
          title: 'Deep Focus',
          description: 'Keep calm and focus with ambient and post-rock music.',
          type: 'Playlist',
          image: {
            sources: [
              { url: 'https://i.scdn.co/image/ab67706f00000002d6d48b11fd3b11da654c3519', width: null, height: null },
            ],
            extractedColors: { colorDark: { hex: '#404038', isFallback: false } },
          },
          owner: { name: 'Spotify', type: 'User' },
        },
        {
          title: 'Instrumental Study',
          description: 'Focus with soft study music in the background.',
          type: 'Playlist',
          image: {
            sources: [
              { url: 'https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c', width: null, height: null },
            ],
            extractedColors: { colorDark: { hex: '#777777', isFallback: false } },
          },
          owner: { name: 'Spotify', type: 'User' },
        },
        {
          title: 'Workday Lounge',
          description: 'Lounge and chill out music for your workday.',
          type: 'Playlist',
          image: {
            sources: [
              { url: 'https://i.scdn.co/image/ab67706f00000002e435ce0a86a8b9dc24527618', width: null, height: null },
            ],
            extractedColors: { colorDark: { hex: '#5E7C81', isFallback: false } },
          },
          owner: { name: 'Spotify', type: 'User' },
        },
        {
          title: 'Beats to think to',
          description: 'Focus with melodic techno and tech house.',
          type: 'Playlist',
          image: {
            sources: [
              { url: 'https://i.scdn.co/image/ab67706f0000000296e08a91ef3c7a6e7bfaa9a6', width: null, height: null },
            ],
            extractedColors: { colorDark: { hex: '#182040', isFallback: false } },
          },
          owner: { name: 'Spotify', type: 'User' },
        },
        {
          title: 'Reading Adventure',
          description: 'Scores and soundtracks for daring quests, epic journeys, and the greatest reading adventures. ',
          type: 'Playlist',
          image: {
            sources: [
              { url: 'https://i.scdn.co/image/ab67706f00000002fee0aa7c6bfc815873e45f9e', width: null, height: null },
            ],
            extractedColors: { colorDark: { hex: '#383838', isFallback: false } },
          },
          owner: { name: 'Spotify', type: 'User' },
        },
      ],
    };

    const section = await Section.create(initShortsSection);

    return section;
  }
  async getPreviewSections() {
    const sections = await Section.find({ type: 'PreviewSection' });

    return sections || [];
  }
  async getShortsSection(id) {
    const section = await Section.findOne({
      // 'items.owner.id': id,
      type: 'ShortsSection',
    });
    section.items[0].owner.id = id;

    return section;
  }
}

export default new SectionService();
