import mongoose from 'mongoose';

const AdvertismentPost = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    availableUntil: {type: String},
    images: {type: String},
    authorId: {type: String},
    productLink: {type: String},
    sellerLink: {type: String}
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('advertismentpost', AdvertismentPost);