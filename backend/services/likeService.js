import Like from "../models/like.js";

const likeService = {
  getAllLikes: async () => {
    return await Like.find().populate("user info");
  },

  toggleLike: async (userId, infoId, status = "like") => {
    const existing = await Like.findOne({ user: userId, info: infoId });

    if (existing) {
      if (existing.status === status) {
        return await Like.findByIdAndDelete(existing._id);
      } else {
        existing.status = status;
        return await existing.save();
      }
    } else {
      return await Like.create({ user: userId, info: infoId, status });
    }
  },

  countByStatus: async (infoId, status) => {
    return await Like.countDocuments({ info: infoId, status });
  },
};

export default likeService;
