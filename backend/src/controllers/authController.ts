import { Request, Response } from 'express'
import prisma from '../prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      res.status(400).json({
        message: 'User already exists'
      })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({
      message: 'Server Error'
    })
  }
}

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      res.status(400).json({
        message: 'Invalid credentials'
      })
      return
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    )

    if (!validPassword) {
      res.status(400).json({
        message: 'Invalid credentials'
      })
      return
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d'
      }
    )

    res.json({ token })
  } catch (error) {
    res.status(500).json({
      message: 'Server Error'
    })
  }
}