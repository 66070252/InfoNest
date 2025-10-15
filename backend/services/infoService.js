import Info from "../models/info.js"

const infoService = {
  getAllInfo: async () => {
    return await Info.find();
  },
  getInfoById: async (id) => {
    return await Info.findById(id); 
  },
  getInfosByAuthor: async (authorId) => {
    console.log("2. Reached getInfosByAuthor service.");
    console.log("   - Received authorId:", authorId);
    return await Info.find({ author: authorId });
  },
 create: async(title, info, imageUrl, authorId) => {
    return await Info.create({
      title, 
      info,
      imageUrl,
      author: authorId
    })
  },
  delete: async (id) => {
    return await Info.findByIdAndDelete(id);
  },
  deleteByUser: async (infoId, userId) => {
    const info = await Info.findById(infoId);

    if (!info) {
      return { error: "Info not found", status: 404 };
    }

    if (info.author.toString() !== userId) {
      return { error: "Forbidden: You are not the author of this post", status: 403 };
    }

    await Info.findByIdAndDelete(infoId);
    return { success: true };
  },
  update: async (id, updateData) => {
    return await Info.findByIdAndUpdate(id, updateData, { new: true });
  },
  getInfosByAuthor: async (authorId) => {
    return await Info.find({ author: authorId });
  },
}

export default infoService