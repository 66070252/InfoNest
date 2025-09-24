import likeController from "../controllers/likeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const useLikeRoute = (router) => {
  router.post("/like/toggle", authMiddleware(), likeController.toggleLike);

  router.get("/like/all",authMiddleware("admin"), likeController.getAllLikes);

  router.get("/dislike/all", authMiddleware("admin"), likeController.getAllDislikes);
};

export default useLikeRoute;

