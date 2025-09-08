import infoController from "../controllers/infoController.js"

const useUserRoute = async (router) => {
  router.get('/info', infoController.getAllInfo)
  router.get('/info/:id', infoController.getInfoById)
  router.post('/info', infoController.create)
  router.delete('/info/:id', infoController.delete)
}

export default useUserRoute