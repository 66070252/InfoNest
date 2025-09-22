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
  images: {
    type: String
  }
})

const Info = mongoose.model("Info", InfoSchema);

export default Info