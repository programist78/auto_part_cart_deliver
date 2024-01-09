import mongoose from 'mongoose'

const Help = new mongoose.Schema({
  authorName: { type: String, required: true },
  text: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true })

export default mongoose.models.Help || mongoose.model('Help', Help)