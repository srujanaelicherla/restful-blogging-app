import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'

dotenv.config()

const app = express()

// Update CORS to explicitly allow your frontend and handle preflight
app.use(cors({
  origin: 'https://restful-blogging-app-delta.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Intercept OPTIONS requests explicitly
app.options('*', cors()) 

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API Running')
})

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app