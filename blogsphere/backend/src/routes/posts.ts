import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// GET /posts
router.get('/', async (_req, res: Response) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  })
  res.json(posts)
})

// GET /posts/:id
router.get('/:id', async (req, res: Response) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: { author: { select: { name: true } } },
  })
  if (!post) {
    res.status(404).json({ message: 'Post not found.' })
    return
  }
  res.json(post)
})

// POST /posts
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body

  if (!title || !content) {
    res.status(400).json({ message: 'Title and content are required.' })
    return
  }

  const post = await prisma.post.create({
    data: { title, content, authorId: req.userId as number },
    include: { author: { select: { name: true } } },
  })

  res.status(201).json(post)
})

// DELETE /posts/:id
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
  })

  if (!post) {
    res.status(404).json({ message: 'Post not found.' })
    return
  }

  if (post.authorId !== req.userId) {
    res.status(403).json({ message: 'Forbidden.' })
    return
  }

  await prisma.post.delete({ where: { id: Number(req.params.id) } })
  res.json({ message: 'Post deleted.' })
})

export default router