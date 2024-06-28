'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

interface PaginationOptions {
  page?: number
  take?: number,
  isAdmin?: boolean
}

export const getPaginationOrders = async ({ page = 1, take = 2, isAdmin = false }: PaginationOptions) => {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: 'User session not exists'
    }
  }

  const orders = await prisma.order.findMany({
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    },
    where: {
      userId: isAdmin ? undefined : session.user.id
    },
    take: take,
    skip: (page - 1) * take,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const totalOrders = await prisma.order.findMany({
    select: {
      id: true
    },
    where: {
      userId: session.user.id
    },
  })

  const totalPages = Math.ceil(totalOrders.length / take)

  return {
    ok: true,
    currentPage: page,
    totalPages: totalPages,
    orders: orders
  }
}