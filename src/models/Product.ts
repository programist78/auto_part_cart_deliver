import mongoose from 'mongoose';

const Product = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    price: { type: Number, required: true },
    images: [{ type: String }],
    text: { type: String, required: true },
    madeIn: { type: String },
    modelCar: { type: String },
    dimensions: { type: String },
    amount: { type: Number },
    stripeId: { type: String, required: true },
    active: { type: Boolean, default: true }
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Product || mongoose.model('Product', Product)