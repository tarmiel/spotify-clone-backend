import { Schema, model } from 'mongoose';

const ArtistSchema = new Schema({
  name: String,
  popularity: Number,
  genres: [String],
  followers: Number,
  images: [
    {
      url: String,
      width: { type: Number, default: null },
      height: { type: Number, default: null },
    },
  ],
}).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model('Artist', ArtistSchema);
