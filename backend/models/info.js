import mongoose from 'mongoose'

const InfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
})

const Info = mongoose.model("Info", InfoSchema);

export default Info