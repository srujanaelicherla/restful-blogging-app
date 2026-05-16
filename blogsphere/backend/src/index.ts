import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/posts', postRoutes)

export default app