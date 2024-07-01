'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {

  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: 'The user must be authenticated'
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          include: {
            card: {
              select: {
                name: true,
                password: true,
                cardImage: true
              }
            }
          }
        }
      }
    })

    if (!order) throw new Error(`${id} not exists`)

    if (session.user.role === 'user' && session.user.id !== order.userId) throw new Error(`The order ${id} does not belong to the logged in user`)

    return {
      ok: true,
      order
    }
  } catch (error) {
    let message

    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
      message = 'The order could not be obtained';
    }

    console.log({ message })

    return {
      ok: false,
      message: message
    }
  }
}