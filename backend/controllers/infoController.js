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
      if (!info) {
        return res.status(404).json({ message: "Info not found" })
      }
    } catch(err) {
      res.status(500).json(err)
    }
  },
  getMyInfos: async (req, res) => {
    try {
      const authorId = req.user;
      const infos = await infoService.getInfosByAuthor(authorId);
      res.status(200).json(infos);
    } catch (err) {
      console.error("❌ CRASHED in getMyInfos controller:", err);
      res.status(500).json({ message: err.message });
    }
  },
  create: async (req, res) => {
    try{
      const { title, info, imageUrl } = req.body
      const authorId = req.user

      const newInfo = await infoService.create(title, info, imageUrl, authorId)

      res.status(201).json(newInfo)
    } catch(err){
      res.status(500).json(err)
    }
  },
  delete: async (req, res) => {
    try {
      const infoId = req.params.id
      const userId = req.user

      const result = await infoService.deleteByUser(infoId, userId)

      if (result.error) {
        return res.status(result.status).json({ message: result.error })
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