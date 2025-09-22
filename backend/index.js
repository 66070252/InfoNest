import dotenv from 'dotenv'
import express, { json } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/router.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './services/swagger.js'
import cookieParser from "cookie-parser";

const app = express()
const port = 3000

dotenv.config()


const dbUrl = process.env.DB_URL
const connect = async () => {
   try {
      await mongoose.connect(dbUrl)  
      console.log('Connected to MongoDB successfully')
   } catch (error) {
      console.error('Error connecting to MongoDB:', error)
   }
}
await connect()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api", router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`📚 API documentation is available at http://localhost:${port}/api-docs`);
})