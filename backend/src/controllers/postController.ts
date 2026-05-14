import { Response } from 'express'
import prisma from '../prisma'
import { AuthRequest } from '../middleware/authMiddleware'

export const createPost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, content } = req.body

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.userId!
      }
    })

    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({
      message: 'Server Error'
    })
  }
}

export const getPosts = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true
      }
    })

    res.json(posts)
  } catch (error) {
    res.status(500).json({
      message: 'Server Error'
    })
  }
}

export const deletePost = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id)

    await prisma.post.delete({
      where: { id }
    })

    res.json({
      message: 'Post deleted'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error'
    })
  }
}