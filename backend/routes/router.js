import express from 'express'
import useInfoRoute from './infoRoutes.js'
const router = express.Router()

useInfoRoute(router)

export default router