import infoController from "../controllers/infoController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const useUserRoute = async (router) => {
  /**
 * @swagger
 * tags:
 *  name: Info
 *  description: Info management endpoints
 */

  /**
 * @swagger
 * /api/info:
 *  get:
 *      summary: Get all info
 *      tags: [Info]
 *      responses:
 *          200:
 *              description: A list of Info
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Info'
 *          500:
 *              description: Server error
 */
  router.get('/info', infoController.getAllInfo)
  
  router.get('/info/search', infoController.searchInfos);
  
 /**
   * @swagger
   * /api/info/mine:
   *  get:
   *    summary: Get all posts created by the logged-in user
   *    tags: [Info]
   *    security:
   *      - bearerAuth: []
   *    responses:
   *        200:
   *          description: A list of the user's posts.
   *        401:
   *          description: Unauthorized.
   */
  router.get('/info/mine', authMiddleware(), infoController.getMyInfos)

      /**
 * @swagger
 * /api/info/{id}:
 *   get:
 *     summary: Get a info by ID
 *     tags: [Info]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the info
 *     responses:
 *       200:
 *         description: A info detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Info'
 *       404:
 *         description: Info not found
 *       500:
 *        description: Server error
 */
  router.get('/info/:id', infoController.getInfoById)

  /**
 * @swagger
 * /api/info/{id}:
 *   put:
 *     summary: Update a info
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The info ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InfoInput'
 *     responses:
 *       200:
 *         description: Info updated successfully
 *       404:
 *         description: Info not found
 *       500:
 *         description: Server error
 */
  router.put('/info/:id', authMiddleware(), infoController.update)

  /**
 * @swagger
 * /api/info:
 *   post:
 *     summary: Create a new info
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InfoInput'
 *     responses:
 *       201:
 *         description: Info created successfully
 *       400:
 *         description: Title and info are required
 *       500:
 *         description: Server error
 */
  router.post('/info', authMiddleware(), infoController.create)

  /**
 * @swagger
 * /api/info/{id}:
 *   delete:
 *     summary: delete a info
 *     tags: [Info]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the info to delete
 *     responses:
 *       200:
 *         description: Info deleted successfully
 *       404:
 *         description: Info not found
 *       500:
 *         description: Server error
 */
  router.delete('/info/:id', authMiddleware(), infoController.delete)

}

export default useUserRoute
