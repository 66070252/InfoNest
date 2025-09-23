import likeController from "../controllers/likeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const useLikeRoute = (router) => {
  router.post("/like/toggle", authMiddleware(), likeController.toggleLike);

  router.get("/like/all", likeController.getAllLikes);

  router.get("/dislike/all", likeController.getAllDislikes);
};

export default useLikeRoute;

