'use server'

import prisma from "@/lib/prisma"
// import { sleep } from "@/utils/sleep"

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    // await sleep(3)

    const card = await prisma.card.findFirst({
      select: {
        inStock: true
      },
      where: {
        slug: slug
      }
    })

    if (!card) return 0

    return card.inStock ?? 0

  } catch (error) {
    console.log(error)
    throw new Error('Error getting stock')
  }
}