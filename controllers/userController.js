import userService from "../services/userService.js"

const userController = {
  getAllUsers: async (req, res) => {
    try{
      const users = await userService.getAllUsers()
      res.status(200).json(users)
    } catch(err) {
      res.status(500).json(err)
    }
  },
  getUserById: async (req, res) => {
    try {
      const id = req.params.id
      const user = await userService.getUserById(id)
      res.status(200).json(user)
    } catch(err) {
      res.status(500).json(err)
    }
    
  },
  create: async (req, res) => {
    try{
      const { username, password, ConfirmPassword } = req.body
      const user = await userService.create(username, password, ConfirmPassword)
      res.status(201).json(user)
    } catch(err){
      res.status(500).json(err)
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id
      const deleted = await userService.delete(id)
      if (!deleted) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json({ message: "User deleted successfully" })
    } catch (err) {
      res.status(500).json(err)
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;
      const updatedUser = await userService.update(id, updateData);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default userController