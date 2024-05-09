'use server'

import prisma from "@/lib/prisma"

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    // console.log({ countries })
    // return countries.map(country => country.name)
    return countries
  } catch (error) {
    console.log(error)
    return []
  }
}