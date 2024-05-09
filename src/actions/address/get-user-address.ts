'use server'

import prisma from "@/lib/prisma"

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findFirst({
      where: {
        userId: userId
      }
    })

    if (!address) return null

    const { countryId, address2,...restAddress } = address

    return {
      ...restAddress,
      // address2: address2 ? address2 : '',
      country: countryId
    }
  } catch (error) {
    console.log({ error })
    return null
  }
}