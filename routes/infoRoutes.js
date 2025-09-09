import infoController from "../controllers/infoController.js"

const useUserRoute = async (router) => {
  /**
 * @swagger
 * tags:
 *  name: Info
 *  description: Info management endpoints
 */

/**
 * @swagger
 * /api/products:
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
 */
  router.get('/info', infoController.getAllInfo)
  router.get('/info/:id', infoController.getInfoById)
  router.put('/info/:id', infoController.update)
  router.post('/info', infoController.create)
  router.delete('/info/:id', infoController.delete)

}

export default useUserRoute