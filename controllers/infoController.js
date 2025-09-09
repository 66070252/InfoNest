import infoService from "../services/infoService.js"

const infoController = {
    getAllInfo: async (req, res) => {
    try{
      const info = await infoService.getAllInfo()
      res.status(200).json(info)
    } catch(err) {
      res.status(500).json(err)
    }
  },
  getInfoById: async (req, res) => {
    try {
      const id = req.params.id
      const info = await infoService.getInfoById(id)
      res.status(200).json(info)
    } catch(err) {
      res.status(500).json(err)
    }
    
  },
  create: async (req, res) => {
    try{
      const { title, info, images} = req.body
      const Info = await infoService.create(title, info, images)
      res.status(201).json(Info)
    } catch(err){
      res.status(500).json(err)
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id
      const deleted = await infoService.delete(id)
      if (!deleted) {
        return res.status(404).json({ message: "Info not found" })
      }
      res.status(200).json({ message: "Info deleted successfully" })
    } catch (err) {
      res.status(500).json(err)
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const updatedInfo = await infoService.update(id, updateData);
      if (!updatedInfo) {
        return res.status(404).json({ message: "Info not found" });
      }
      res.status(200).json({ message: "Info updated successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default infoController