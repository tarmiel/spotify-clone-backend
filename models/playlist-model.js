import { Schema, model } from 'mongoose';

const ImageSourceSchema = new Schema(
  {
    url: String,
    width: { type: Number, default: null },
    height: { type: Number, default: null },
  },
  { _id: false }
);
const ColorDarkSchema = new Schema(
  {
    hex: String,
    isFallback: Boolean,
  },
  { _id: false }
);
const ExtractedColorsSchema = new Schema(
  {
    colorDark: ColorDarkSchema,
  },
  { _id: false }
);

const ImageSchema = new Schema(
  {
    sources: [ImageSourceSchema],
    extractedColors: ExtractedColorsSchema,
  },
  { _id: false }
);
const OwnerSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String,
    name: String,
  },
  { _id: false }
);

const TracksSchema = new Schema(
  {
    total: Number,
    offset: Number,
    limit: Number,
    items: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
  },
  { _id: false }
);

const PlaylistSchema = new Schema({
  name: String,
  description: String,
  followers: Number,
  public: Boolean,
  images: [ImageSchema],
  owner: OwnerSchema,
  tracks: TracksSchema,
});

// Ensure virtual fields are serialised.
PlaylistSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default model('Playlist', PlaylistSchema);
