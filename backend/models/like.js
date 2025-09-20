import mongoose from "mongoose"

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Info",
    required: true
  },
  status: {
    type: String,
    enum: ["like", "dislike"],
    required: true
  }
});

LikeSchema.index({ user: 1, info: 1 }, { unique: true });

const Like = mongoose.model("Like", LikeSchema);

export default Like;
