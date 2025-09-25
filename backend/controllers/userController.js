import userService from "../services/userService.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
  register: async (req, res) => {
    try{
      const { username, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await userService.create(username, email, hashedPassword)
      res.status(201).json(user)
    } catch(err){
      res.status(500).json(err)
    }
  },
  login: async (req, res) => {
    try{
      const { emailOrUsername, password } = req.body
      console.log(emailOrUsername, password)
      const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);
      let user = null

      if (!isEmail) {
        user = await userService.getByUsername(emailOrUsername);
      } else {
        user = await userService.getByEmail(emailOrUsername);
      }
      console.log(user)
      if(!user){
        return res.status(401).json({
        message: "Username or Password incorrect"
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatch);

      if(!isMatch){
        return res.status(401).json({
        message: "Username or Password incorrect"
        });
      }
      
      const jwt_secret = process.env.JWT_SECRET;
      const payload = { username: user.username, userId: user.id, role: user.role}
      const token = jwt.sign(payload, jwt_secret, { expiresIn: "3d" });
      res.status(200).json({
        token: token
      })
      console.log("Generated JWT:", token);
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