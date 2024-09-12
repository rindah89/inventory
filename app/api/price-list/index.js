// File: pages/api/price-lists/index.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Assuming price list is just a special type of item group
      const priceList = await prisma.itemGroup.create({
        data: {
          ...req.body,
          type: 'PRICE_LIST'
        }
      })
      res.status(201).json(priceList)
    } catch (error) {
      res.status(400).json({ error: 'Error creating price list' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}