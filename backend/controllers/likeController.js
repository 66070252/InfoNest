import likeService from "../services/likeService.js"
import userService from "../services/userService.js"
import jwt from "jsonwebtoken"

const likeController = {
  toggleLike: async (req, res) => {
    try {
      const { infoId, status } = req.body;
      const jwt_secret = process.env.JWT_SECRET;
      const tokenArray = req.headers['authorization'].split(' ');
      const decodedToken = jwt.verify(tokenArray[1], jwt_secret);
      const user = await userService.getUserById(decodedToken.userId);
      
      if (!infoId || !status) {
        return res.status(400).json({ message: "infoId and status are required" });
      }

      
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: user not found" });
      }

      const result = await likeService.toggleLike(user, infoId, status);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  getAllLikes: async (req, res) => {
    try {
      const likes = await likeService.getAllLikes();
      res.status(200).json(likes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  getAllDislikes: async (req, res) => {
    try {
      const dislikes = await likeService.getAllDislikes();
      res.status(200).json(dislikes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getLikedPosts: async (req, res) => {
    try {
      const userId = req.user; 
      const likedInfos = await likeService.getLikesByUser(userId);
      res.status(200).json(likedInfos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
};

export default likeController;
