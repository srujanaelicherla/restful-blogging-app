import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: [
      'https://restful-blogging-app-delta.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API Running')
})

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

export default app