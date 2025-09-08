import infoService from "../services/infoService.js"

const infoController = {
    getAllInfo: async (req, res) => {
    try{
      const users = await infoService.getAllInfo()
      res.status(200).json(users)
    } catch(err) {
      res.status(500).json(err)
    }
  },
  getInfoById: async (req, res) => {
    try {
      const id = req.params.id
      const user = await infoService.getInfoById(id)
      res.status(200).json(user)
    } catch(err) {
      res.status(500).json(err)
    }
    
  },
  create: async (req, res) => {
    try{
      const { title, info, image, likes, dislikes } = req.body
      const user = await infoService.create(title, info, image, likes, dislikes)
      res.status(201).json(user)
    } catch(err){
      res.status(500).json(err)
    }
  }
}

export default infoController