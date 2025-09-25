import Info from "../models/info.js"

const infoService = {
  getAllInfo: async () => {
    return await Info.find();
  },
  getInfoById: async (id) => {
    return await Info.findById(id); 
  },
  create: async(title, info, images) => {
    return await Info.create({
      title, info, images
    })
  },
  delete: async (id) => {
    return await Info.findByIdAndDelete(id);
  },
  update: async (id, updateData) => {
    return await Info.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export default infoService