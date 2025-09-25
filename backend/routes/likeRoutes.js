import likeController from "../controllers/likeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const useLikeRoute = (router) => {
    /**
 * @swagger
 * tags:
 *  name: Like
 *  description: Like management endpoints
 */
    /**
 * @swagger
 * /api/like:
 *   post:
 *     summary: "Toggle Like"
 *     description: "This endpoint allows a user to like or unlike a post."
 *     tags:
 *       - "Like"
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               infoId:
 *                 type: string
 *                 description: "The ID of the post or content to like/unlike"
 *                 example: "68beb058d4c18a30d1830567"
 *               status:
 *                 type: string
 *                 enum:
 *                   - like
 *                   - unlike
 *                 description: "The action to perform, either 'like' or 'unlike'"
 *                 example: "like"
 *     responses:
 *       200:
 *         description: "Successfully like"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 InfoId:
 *                   type: string
 *                   description: "Indicates whether the action was successful"
 *                   example: "68beb058d4c18a30d1830567"
 *                 status:
 *                   type: string
 *                   description: "Response message"
 *                   example: "like"
 *       401:
 *         description: "Unauthorized - Authentication is required"
 *       400:
 *         description: "Bad Request - Invalid data"
 */
  router.post("/like", authMiddleware(), likeController.toggleLike);

  router.get("/like/all",authMiddleware("admin"), likeController.getAllLikes);

  router.get("/dislike/all", authMiddleware("admin"), likeController.getAllDislikes);
};

export default useLikeRoute;

