// File: pages/api/items/index.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const item = await prisma.item.create({
        data: req.body
      })
      res.status(201).json(item)
    } catch (error) {
      res.status(400).json({ error: 'Error creating item' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

