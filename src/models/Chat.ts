import mongoose from 'mongoose'

const Chat = new mongoose.Schema(
  {
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Chat || mongoose.model('Chat', Chat)