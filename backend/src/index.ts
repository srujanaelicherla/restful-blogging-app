import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'

dotenv.config()

const app = express()

// Allow same-origin in prod, localhost in dev
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://restful-blogging-app-delta.vercel.app'
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.use(express.json())

app.get('/', (_req, res) => {
  res.send('API Running')
})

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

export default app