import mongoose from 'mongoose';

const ShippingCompany = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    deliveryCompany: {
        type: String,
        required: true,
      },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('shippingcompany', ShippingCompany);