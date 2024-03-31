import { Schema, model } from 'mongoose';

const AlbumSchema = new Schema({
  name: String,
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  images: [
    {
      url: String,
      width: { type: Number, default: null },
      height: { type: Number, default: null },
    },
  ],
  releaseDate: String,
  totalTracks: Number,
  tracks: [],
}).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model('Album', AlbumSchema);
