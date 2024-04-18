'use server'

import { Rarities, TypeOfCard } from "@/interfaces/card.interface"
import prisma from "@/lib/prisma"

// import { TypeOfCard } from '@prisma/client'
// type TypeOfCardBD = TypeOfCard | null

interface PaginationOptions {
  page?: number
  take?: number
  typeOfCard?: TypeOfCard
}

export const getPaginatedCardsWithImages = async ({
  page = 1,
  take = 1, // TODO: change to 4
  typeOfCard
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1
  if (isNaN(Number(take))) take = 4
  if (take < 4) take = 4

  // let typesOfCardDB: { [key: string]: string } = []
  let typesOfCardDB: Record<string, string> = {}

  if (typeOfCard) {
    const typesOfCard = await prisma.typeOfCard.findMany({})

    // Transform the result from array to a object, using the reduce method
    typesOfCardDB = typesOfCard.reduce((array, typeOfCard) => {
      array[typeOfCard.name.toUpperCase()] = typeOfCard.id
      return array
    }, {} as Record<string, string>)
  }

  try {
    // 1. Get the cards
    const cards = await prisma.card.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: { name: "asc" },
      include: {
        cardImage: {
          // take: 2,
          select: {
            name: true
          },
        },
        typeOfCard: {
          select: {
            name: true
          }
        },
        rarity: {
          select: {
            name: true
          }
        }
      },
      where: {
        typeOfCardId: typeOfCard != undefined ? typesOfCardDB[typeOfCard] : undefined,
      }
    })

    // 2. Get total cards
    const totalCards = await prisma.card.count({
      where: {
        typeOfCardId: typeOfCard != undefined ? typesOfCardDB[typeOfCard] : undefined,
      }
    })
    // const totalCards = cards.length
    // console.log({ 'totalCards': totalCards })
    const totalPages = Math.ceil(totalCards / take)
    // throw new Error('Test error page')

    return {
      currentPage: page,
      totalPages: totalPages,
      cards: cards.map(card => ({
        ...card,
        level: card.level ?? undefined,
        rank: card.rank ?? undefined,
        link: card.link ?? undefined,
        attack_points: card.attack_points ?? '',
        defense_points: card.defense_points ?? '',
        pendulumEffect: card.pendulumEffect ?? '',
        pendulumScale: Number(card.pendulumScale),
        rarity: card.rarity?.name as Rarities,
        images: card.cardImage.map(image => image.name),
        typeOfCard: card.typeOfCard.name as TypeOfCard
      }))
    }
  } catch (error) {
    throw new Error(`Cards cannot be displayed`)
  }
}