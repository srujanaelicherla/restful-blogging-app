import express from 'express'
import {
  createPost,
  getPosts,
  deletePost
} from '../controllers/postController'

import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.get('/', getPosts)
router.post('/', authMiddleware, createPost)
router.delete('/:id', authMiddleware, deletePost)

export default router