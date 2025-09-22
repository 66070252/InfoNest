import User from "../models/user.js"

const userService = {
  getAllUsers: async () => {
    return await User.find();
  },
  getUserById: async (id) => {
    return await User.findById(id); 
  },
  getByUsername: async (username) => {
  return await User.findOne({ username: username });
  },
  create: async(username, email, password) => {
    return await User.create({
      username, email, password
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