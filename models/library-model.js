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

const ImageSchema = new Schema(
  {
    sources: [ImageSourceSchema],
    extractedColors: {
      colorDark: ColorDarkSchema,
    },
  },
  { _id: false }
);

const SortOrderSchema = new Schema({
  name: String,
}).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const FilterSchema = new Schema({
  name: String,
}).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const OwnerSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String,
    name: String,
  },
  { _id: false }
);

const LibraryItemSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    type: String,
    addedAt: {
      isoString: String,
    },
    pinnable: Boolean,
    pinned: Boolean,
    name: String,
    count: Number,
    image: ImageSchema,
    owner: OwnerSchema,
  },
  { _id: false }
);

const LibrarySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  availableFilters: [FilterSchema],
  availableSortOrders: [SortOrderSchema],
  pagingInfo: {
    offset: Number,
    limit: Number,
  },
  totalCount: Number,
  items: [LibraryItemSchema],
}).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
export default model('Library', LibrarySchema);
