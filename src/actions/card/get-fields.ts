'use server'

import prisma from "@/lib/prisma"

// import { initialData } from "@/seed/seed-yugioh"

// const {
//   typesOfCard,
//   attributes,
//   types,
//   monsterInvocations,
//   monsterPrimaryTypes,
//   monsterSecondaryTypes,
//   monsterAbilities,
//   linkArrows,
//   rarities,
//   spellTypes,
//   trapTypes
// } = initialData

export const getFields = async () => {
  try {
    const typesOfCard = await prisma.typeOfCard.findMany({})
    const attributes = await prisma.attribute.findMany({})
    const types = await prisma.type.findMany({})
    const monsterInvocations = await prisma.monsterInvocations.findMany({})
    const monsterPrimaryTypes = await prisma.monsterPrimaryTypes.findMany({})
    const monsterSecondaryTypes = await prisma.monsterSecondaryTypes.findMany({})
    const monsterAbilities = await prisma.monsterAbility.findMany({})
    const linkArrows = await prisma.linkArrows.findMany({})
    
    const spellTypes = await prisma.spellType.findMany({})
    const trapTypes = await prisma.trapType.findMany({})

    const rarities = await prisma.rarity.findMany({})

    return {
      ok: true,
      fieldsData: {
        typesOfCard,
        attributes,
        types,
        monsterInvocations,
        monsterPrimaryTypes,
        monsterSecondaryTypes,
        monsterAbilities,
        linkArrows,
        spellTypes,
        trapTypes,
        rarities
      }
    }
  } catch (error) {
    console.log(error)

    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = 'Error when obtaining information from the card fields'
    }

    return {
      ok: false,
      message
    }
  }
}