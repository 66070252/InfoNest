import express from 'express'
import useInfoRoute from './infoRoutes.js'
import useUserRoute from './userRoutes.js'
import useLikeRoute from './likeRoutes.js'

const router = express.Router()

useInfoRoute(router)
useUserRoute(router)
useLikeRoute(router)

export default router