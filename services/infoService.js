import Info from "../models/info.js"

const infoService = {
  getAllInfo: async () => {
    return await Info.find();
  },
  getInfoById: async (id) => {
    return await Info.findById(id); 
  },
  create: async(title, info, images, likes, dislikes) => {
    return await Info.create({
      title, info, images, likes, dislikes
    })
  },
  delete: async (id) => {
    return await Info.findByIdAndDelete(id);
  }
}

export default infoService