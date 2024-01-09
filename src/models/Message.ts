import mongoose from 'mongoose'

const Message = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }
}, { timestamps: true })

export default mongoose.models.Message || mongoose.model('Message', Message)