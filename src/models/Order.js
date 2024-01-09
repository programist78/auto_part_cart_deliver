import mongoose from 'mongoose';

const Order = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    addressDelivery: {
      type: String,
    },
    deliveryCompany: {type: String},
    priceforProduct: {type: Number},
    priceforDelivery: {type: Number},
    tariff: {type: String},
    delivered: {type: Boolean, required: true},
    stripeId: {type: String, required: true}
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('order', Order);