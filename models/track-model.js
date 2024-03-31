import { Schema, model } from 'mongoose';

const TrackSchema = new Schema({
  name: String,
  url: String,
  duration_ms: Number,
  isPlayable: Boolean,
  album: { type: Schema.Types.ObjectId, ref: 'Album' },
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
}).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model('Track', TrackSchema);
