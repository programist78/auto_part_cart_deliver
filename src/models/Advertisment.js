import mongoose from 'mongoose';

const Advertisment = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxCount: {type: Number},
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('advertisment', Advertisment);