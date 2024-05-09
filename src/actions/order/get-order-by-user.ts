'use server'

import prisma from "@/lib/prisma"

import { auth } from "@/auth.config"

export const getOrderByUser = async () => {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: 'User session not exists'
    }
  }

  try {
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
        userId: session.user.id
      }
    })

    return {
      ok: true,
      orders: orders
    }
  } catch (error) {
    let message

    if (error instanceof Error) {
      message = error.message
    } else {
      message = 'Unexpected error'
    }

    return {
      ok: false,
      message: message
    }
  }
}