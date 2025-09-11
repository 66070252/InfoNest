import User from "../models/user.js"

const userService = {
  getAllUsers: async () => {
    return await User.find();
  },
  getUserById: async (id) => {
    return await User.findById(id); 
  },
  create: async(username, password, ConfirmPassword) => {
    return await User.create({
      username, password, ConfirmPassword
    })
  },
  delete: async (id) => {
    return await User.findByIdAndDelete(id);
  },
  update: async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }
}

export default userService