'use server'

import prisma from "@/lib/prisma"

export const deleteUserAddress = async (userId: string) => {
  try {
    const userAddress = await prisma.userAddress.findFirst({ where: { userId: userId } })

    if (!userAddress) throw new Error('Not exists a address associated with the user')

    await prisma.userAddress.delete({
      where: {
        userId: userId
      }
    })

    return {
      ok: true
    }
  } catch (error) {
    // console.log({ error })
    let message

    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }

    console.log({ message })

    return {
      ok: false,
      message: message
    }
  }
}