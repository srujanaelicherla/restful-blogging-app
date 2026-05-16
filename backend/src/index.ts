import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.options('*', cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API Running')
})

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

export default app