'use server'

import prisma from "@/lib/prisma"

export const setTransactionId = async (orderId: string, transactionId: string) => {
  // console.log({ orderId, transactionId })
  try {
    const orderUpdated = await prisma.order.update({
      data: {
        transactionId: transactionId
      },
      where: {
        id: orderId
      }
    })

    if (!orderUpdated) {
      return {
        ok: false,
        message: `Order ${orderId} not found`
      }
    }

    return {
      ok: true
    }
  } catch (error) {
    console.log({ error })
    let message

    if (error instanceof Error) {
      message = error.message
    } else {
      message = 'Unexpected error'
    }

    return {
      ok: false,
      message
    }
  }
}