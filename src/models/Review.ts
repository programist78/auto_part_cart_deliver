import mongoose from 'mongoose'

const Review = new mongoose.Schema({
  belongsTo: { type: String, required: true },
  authorName: { type: String, required: true },
  text: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true })

export default mongoose.models.Review || mongoose.model('Review', Review);