import prisma from '../lib/prisma'

import { Attributes, LinkArrows, MonsterAbilities, MonsterInvocations, MonsterPrimaryTypes, MonsterSecondaryTypes, Rarities, SpellTypes, TrapTypes, Types, TypesOfCard, initialData } from "./seed-yugioh"
import lodash from "lodash"

async function main () {
  // console.log(process.env.NODE_ENV)
  // console.log(initialData)

  // 1. Delete previous data
  // await Promise.all([
  await prisma.monsterPrimaryTypesCard.deleteMany()
  await prisma.linkArrowsCard.deleteMany()
  await prisma.cardImage.deleteMany()

  await prisma.card.deleteMany()
  await prisma.typeOfCard.deleteMany()
  await prisma.attribute.deleteMany()
  await prisma.type.deleteMany()
  await prisma.monsterInvocations.deleteMany()
  await prisma.monsterPrimaryTypes.deleteMany()
  await prisma.monsterSecondaryTypes.deleteMany()
  await prisma.monsterAbility.deleteMany()
  await prisma.linkArrows.deleteMany()
  await prisma.spellType.deleteMany()
  await prisma.trapType.deleteMany()
  await prisma.rarity.deleteMany()

  // ])
  console.log('Rows deleted...')

  const {
    typesOfCard, attributes, types,
    monsterInvocations, monsterPrimaryTypes, monsterSecondaryTypes, monsterAbilities,
    linkArrows, spellTypes, trapTypes, rarities,
    cards
  } = initialData

  const typeOfCardMap = await typeOfCardInsert(typesOfCard)
  const attributesMap = await attributeInsert(attributes)
  const typesMap = await typeInsert(types)
  const monsterInvocationMap = await monsterInvocationInsert(monsterInvocations)
  const monsterPrimaryTypesMap = await monsterPrimaryTypesInsert(monsterPrimaryTypes)
  const monsterSecondaryTypeMap = await monsterSecondaryTypeInsert(monsterSecondaryTypes)
  const monsterAbilityMap = await monsterAbilityInsert(monsterAbilities)
  const linkArrowsMap = await linkArrowsInsert(linkArrows)
  const spellTypeMap = await spellTypeInsert(spellTypes)
  const trapTypeMap = await trapTypeInsert(trapTypes)
  const rarityMap = await rarityInsert(rarities)

  // Cards to insert
  cards.forEach(async card => {
    const { typeOfCard, attribute, type, images, monsterInvocation, monsterPrimaryTypes, monsterSecondaryTypes, monsterAbility, linkArrows, spellType, trapType, rarity, ...cardToInsert } = card
    console.log({ cardToInsert })

    const cardDB = await prisma.card.create({
      data: {
        ...cardToInsert,
        typeOfCardId: typeOfCardMap[card.typeOfCard.toLowerCase()],
        attributeId: attributesMap[card.attribute?.toLowerCase()!],
        typeId: typesMap[card.type?.toLowerCase()!],
        monsterInvocationId: monsterInvocationMap[card.monsterInvocation?.toLowerCase()!],
        monsterSecondaryTypesId: monsterSecondaryTypeMap[card.monsterSecondaryTypes?.toLowerCase()!],
        monsterAbilityId: monsterAbilityMap[card.monsterAbility?.toLowerCase()!],
        spellTypeId: spellTypeMap[card.spellType?.toLowerCase()!],
        trapTypeId: trapTypeMap[card.trapType?.toLowerCase()!],
        rarityId: rarityMap[card.rarity.toLowerCase()],
        slug: lodash.kebabCase(card.name)
      }
    })

    // Images to insert
    if (images) {
      const imagesData = images.map(image => ({
        name: image,
        cardId: cardDB.id
      }))

      await prisma.cardImage.createMany({
        data: imagesData
      })
    }

    // monsterPrimaryTypes to insert
    if (monsterPrimaryTypes) {
      const monsterPrimaryTypesData = monsterPrimaryTypes.map(monsterPrimaryType => ({
        monsterPrimaryTypeId: monsterPrimaryTypesMap[monsterPrimaryType.toLowerCase()],
        cardId: cardDB.id
      }))

      await prisma.monsterPrimaryTypesCard.createMany({
        data: monsterPrimaryTypesData
      })
    }

    // linkArrows to insert
    if (linkArrows) {
      const linkArrowsData = linkArrows.map(linkArrow => ({
        linkArrowsId: linkArrowsMap[linkArrow.toLowerCase()],
        cardId: cardDB.id
      }))

      await prisma.linkArrowsCard.createMany({
        data: linkArrowsData
      })
    }
  })

  console.log('Seed execute')
}

async function typeOfCardInsert (typesOfCard: TypesOfCard[]) {
  const typesOfCardData = typesOfCard.map(typeOfCard => ({
    name: lodash.capitalize(typeOfCard)
  }))

  await prisma.typeOfCard.createMany({
    data: typesOfCardData
  })
  console.log('Types of card added...')

  const typesOfCardDB = await prisma.typeOfCard.findMany()

  // const typeOfCardMap = typesOfCardDB.map(({ id, name }) => ({
  //   [name.toLowerCase()]: id
  // }))

  const typeOfCardMap = typesOfCardDB.reduce((array, typeOfCard) => {
    array[typeOfCard.name.toLowerCase()] = typeOfCard.id
    return array
  }, {} as Record<string, string>)
  // console.log({ typeOfCardMap })

  return typeOfCardMap
}

async function attributeInsert (attributes: Attributes[]) {
  const attributesData = attributes.map(attribute => ({
    name: lodash.capitalize(attribute)
  }))

  await prisma.attribute.createMany({
    data: attributesData
  })
  console.log('Attributes added...')

  const attributesDB = await prisma.attribute.findMany()

  const attributesMap = attributesDB.reduce((array, attribute) => {
    array[attribute.name.toLowerCase()] = attribute.id
    return array
  }, {} as Record<string, string>)
  // console.log({ attributesMap })

  return attributesMap
}

async function typeInsert (types: Types[]) {
  const typesData = types.map(type => ({
    name: lodash.capitalize(type)
  }))

  await prisma.type.createMany({
    data: typesData
  })
  console.log('Types added...')

  const typesDB = await prisma.type.findMany()

  const typesMap = typesDB.reduce((array, type) => {
    array[type.name.toLowerCase()] = type.id
    return array
  }, {} as Record<string, string>)
  // console.log({ typesMap })

  return typesMap
}

async function monsterInvocationInsert (monsterInvocations: MonsterInvocations[]) {
  const monsterInvocationsData = monsterInvocations.map(monsterInvocation => ({
    name: lodash.capitalize(monsterInvocation)
  }))

  await prisma.monsterInvocations.createMany({
    data: monsterInvocationsData
  })
  console.log('monsterInvocations added...')

  const monsterInvocationsDB = await prisma.monsterInvocations.findMany()

  const monsterInvocationsMap = monsterInvocationsDB.reduce((array, monsterInvocation) => {
    array[monsterInvocation.name.toLowerCase()] = monsterInvocation.id
    return array
  }, {} as Record<string, string>)
  // console.log({ monsterInvocation })

  return monsterInvocationsMap
}

async function monsterPrimaryTypesInsert (monsterPrimaryTypes: MonsterPrimaryTypes[]) {
  const monsterPrimaryTypesData = monsterPrimaryTypes.map(monsterPrimaryType => ({
    name: lodash.capitalize(monsterPrimaryType)
  }))

  await prisma.monsterPrimaryTypes.createMany({
    data: monsterPrimaryTypesData
  })
  console.log('monsterPrimaryTypes added...')

  const monsterPrimaryTypesDB = await prisma.monsterPrimaryTypes.findMany()

  const monsterPrimaryTypesMap = monsterPrimaryTypesDB.reduce((array, monsterPrimaryType) => {
    array[monsterPrimaryType.name.toLowerCase()] = monsterPrimaryType.id
    return array
  }, {} as Record<string, string>)
  // console.log({ monsterInvocationsMap })

  return monsterPrimaryTypesMap
}

async function monsterSecondaryTypeInsert (monsterSecondaryTypes: MonsterSecondaryTypes[]) {
  const monsterSecondaryTypesData = monsterSecondaryTypes.map(monsterSecondaryType => ({
    name: lodash.capitalize(monsterSecondaryType)
  }))

  await prisma.monsterSecondaryTypes.createMany({
    data: monsterSecondaryTypesData
  })
  console.log('monsterSecondaryTypes added...')

  const monsterSecondaryTypesDB = await prisma.monsterSecondaryTypes.findMany()

  const monsterSecondaryTypesMap = monsterSecondaryTypesDB.reduce((array, monsterSecondaryType) => {
    array[monsterSecondaryType.name.toLowerCase()] = monsterSecondaryType.id
    return array
  }, {} as Record<string, string>)
  // console.log({ monsterInvocationsMap })

  return monsterSecondaryTypesMap
}

async function monsterAbilityInsert (monsterAbilities: MonsterAbilities[]) {
  const monsterAbilityData = monsterAbilities.map(monsterAbility => ({
    name: lodash.capitalize(monsterAbility)
  }))

  await prisma.monsterAbility.createMany({
    data: monsterAbilityData
  })
  console.log('monsterAbility added...')

  const monsterAbilityDB = await prisma.monsterAbility.findMany()

  const monsterAbilityMap = monsterAbilityDB.reduce((array, monsterAbility) => {
    array[monsterAbility.name.toLowerCase()] = monsterAbility.id
    return array
  }, {} as Record<string, string>)
  // console.log({ monsterAbilityMap })

  return monsterAbilityMap
}

async function linkArrowsInsert (linkArrows: LinkArrows[]) {
  const linkArrowsData = linkArrows.map(linkArrow => ({
    name: lodash.capitalize(linkArrow)
  }))

  await prisma.linkArrows.createMany({
    data: linkArrowsData
  })
  console.log('linkArrows added...')

  const linkArrowsDB = await prisma.linkArrows.findMany()

  const linkArrowsMap = linkArrowsDB.reduce((array, linkArrows) => {
    array[linkArrows.name.toLowerCase()] = linkArrows.id
    return array
  }, {} as Record<string, string>)
  // console.log({ linkArrowsMap })

  return linkArrowsMap
}

async function spellTypeInsert (spellType: SpellTypes[]) {
  const spellTypeData = spellType.map(linkArrow => ({
    name: lodash.capitalize(linkArrow)
  }))

  await prisma.spellType.createMany({
    data: spellTypeData
  })
  console.log('spellType added...')

  const spellTypeDB = await prisma.spellType.findMany()

  const spellTypeMap = spellTypeDB.reduce((array, spellType) => {
    array[spellType.name.toLowerCase()] = spellType.id
    return array
  }, {} as Record<string, string>)
  // console.log({ spellTypeMap })

  return spellTypeMap
}

async function trapTypeInsert (trapTypes: TrapTypes[]) {
  const trapTypeData = trapTypes.map(trapType => ({
    name: lodash.capitalize(trapType)
  }))

  await prisma.trapType.createMany({
    data: trapTypeData
  })
  console.log('trapType added...')

  const trapTypeDB = await prisma.trapType.findMany()

  const trapTypeMap = trapTypeDB.reduce((array, trapType) => {
    array[trapType.name.toLowerCase()] = trapType.id
    return array
  }, {} as Record<string, string>)
  // console.log({ trapTypeMap })

  return trapTypeMap
}

async function rarityInsert (rarities: Rarities[]) {
  const rarityData = rarities.map(rarity => ({
    name: lodash.capitalize(rarity)
  }))

  await prisma.rarity.createMany({
    data: rarityData
  })
  console.log('rarity added...')

  const rarityDB = await prisma.rarity.findMany()

  const rarityMap = rarityDB.reduce((array, rarity) => {
    array[rarity.name.toLowerCase()] = rarity.id
    return array
  }, {} as Record<string, string>)
  // console.log({ rarityMap })

  return rarityMap
}

(() => {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') return
  main()
})()