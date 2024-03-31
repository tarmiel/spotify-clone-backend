import express from 'express';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './routes/auth-router.js';
import sectionRouter from './routes/section-router.js';
import libraryRouter from './routes/library-router.js';
import trackRouter from './routes/track-router.js';
import playlistRouter from './routes/playlist-router.js';

import Section from './models/section-model.js';
import Library from './models/library-model.js';
import Artist from './models/artist-model.js';
import Album from './models/album-model.js';
import Track from './models/track-model.js';
import Playlist from './models/playlist-model.js';

import { wait } from './utils/wait.js';
import { sections } from './data/sections.js';
import { library } from './data/library.js';
import { albums } from './data/albums.js';
import { tracks } from './data/tracks.js';
import { artists } from './data/artists.js';
import { playlists } from './data/playlists.js';

import errorHandlerMiddleware from './middlewares/error-middleware.js';
import authMiddleware from './middlewares/auth-middleware.js';

import ApiError from './errors/api-error.js';

/* CONFIG */
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(mongoSanitize());

// /* STORAGE */
app.use('/', express.static(path.join(__dirname, 'public/assets')));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public/assets', 'index.html'));
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// =====
app.use('/api/auth', authRouter);
app.use('/api/section', sectionRouter);
app.use('/api/track', trackRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/library', authMiddleware, libraryRouter);
app.get('/api/test', authMiddleware, async (req, res, next) => {
  try {
    return res.status(200).json({ user: { id: 0 } });
  } catch (e) {
    next(e);
  }
});
app.use(errorHandlerMiddleware);

// app.get('/test', (req, res) => {
//   res.send('Hello World');
// });

// app.use('*', (req, res) => {
//   res.status(404).json({ msg: 'not found' });
// });
// =====

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // await Library.create(library);

    // Artist.insertMany(artists);
    // Album.insertMany(albums);
    // Track.insertMany(tracks);
    // Playlist.insertMany(playlists);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();
