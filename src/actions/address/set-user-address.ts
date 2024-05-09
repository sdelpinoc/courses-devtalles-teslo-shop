'use server'

import prisma from "@/lib/prisma";

import type { Address } from "@/interfaces/address.interface";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)

    return {
      ok: true,
      address: newAddress
    }

  } catch (error) {
    console.log({ error })
    return {
      ok: false,
      message: 'Could not save address'
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    // console.log({ userId })
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId
      }
    })

    const addressToSave = {
      countryId: address.country,
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,
      city: address.city,
      phone: address.phone
    }

    if (!storedAddress) {

      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress
    }

    const updatedAddress = await prisma.userAddress.update({
      data: addressToSave,
      where: {
        userId: userId
      }
    })

    return addressToSave

  } catch (error) {
    console.log({ error })
    throw new Error('Could not save or update address')
  }
}