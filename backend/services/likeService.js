import Like from "../models/like.js";
import Info from "../models/info.js";

const likeService = {
  getAllLikes: async () => {
    return await Like.find({ status: "like" }).populate("user info");
  },

  getAllDislikes: async () => {
    return await Like.find({ status: "dislike" }).populate("user info");
  },

  toggleLike: async (userId, infoId, status = "like") => {
    const existing = await Like.findOne({ user: userId, info: infoId });
    const info = await Info.findById(infoId);

    if (!info) throw new Error("Info not found");

    if (existing) {
      if (existing.status === status) {
        await Like.findByIdAndDelete(existing._id);

        if (status === "like") info.likes--;
        else info.dislikes--;

        await info.save();
        return { message: "Like removed", info };
      } else {
        if (status === "like") {
          info.likes++;
          info.dislikes--;
        } else {
          info.dislikes++;
          info.likes--;
        }
        existing.status = status;
        await existing.save();
        await info.save();
        return { message: "Status changed", info };
      }
    } else {
      await Like.create({ user: userId, info: infoId, status });

      if (status === "like") info.likes++;
      else info.dislikes++;

      await info.save();
      return { message: "Like added", info };
    }
  }
};

export default likeService;
