import express from 'express'
import useInfoRoute from './infoRoutes.js'
import useUserRoute from './userRoutes.js'

const router = express.Router()

useInfoRoute(router)
useUserRoute(router)

export default router