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
      const { title, info, images, likes, dislikes } = req.body
      const Info = await infoService.create(title, info, images, likes, dislikes)
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
  }
}

export default infoController