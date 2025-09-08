import Info from "../models/info.js"

const infoService = {
  getAllInfo: async () => {
    return await Info.find();
  },
  getInfoById: async (id) => {
    return await Info.findById(id); 
  },
  create: async(title, info, image, likes, dislikes) => {
    return await Info.create({
      title, info, image, likes, dislikes
    })
  }
}

export default infoService