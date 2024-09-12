// File: pages/api/item-groups/index.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const itemGroup = await prisma.itemGroup.create({
        data: req.body
      })
      res.status(201).json(itemGroup)
    } catch (error) {
      res.status(400).json({ error: 'Error creating item group' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

