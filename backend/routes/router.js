import express from 'express'
import useInfoRoute from './infoRoutes.js'
import useUserRoute from './userRoutes.js'
import useLikeRoute from './likeRoutes.js'
import useUploadRoute from './uploadRoutes.js'

const router = express.Router()

useInfoRoute(router)
useUserRoute(router)
useLikeRoute(router)
useUploadRoute(router)

export default router