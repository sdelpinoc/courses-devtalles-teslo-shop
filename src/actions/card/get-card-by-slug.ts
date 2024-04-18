'use server'

import { Rarities } from "@/interfaces/card.interface"
import prisma from "@/lib/prisma"

export const getCardBySlug = async (slug: string) => {
  // console.log({ slug })
  try {
    const card = await prisma.card.findFirst({
      include: {
        cardImage: {
          // take: 3,
          select: {
            name: true
          }
        },
        rarity: {
          select: {
            name: true
          }
        },
        typeOfCard: {
          select: {
            name: true
          }
        },
        attribute: {
          select: {
            name: true
          }
        },
        type: {
          select: {
            name: true
          }
        },
        monsterInvocation: {
          select: {
            name: true
          }
        },
        monsterPrimaryTypesCard: {
          include: {
            monsterPrimaryType: {
              select: {
                name: true
              }
            }
          }
        },
        monsterSecondaryTypes: {
          select: {
            name: true
          }
        },
        monsterAbility: {
          select: {
            name: true
          }
        },
        LinkArrowsCard: {
          include: {
            linkArrows: {
              select: {
                name: true
              }
            }
          }
        },
        spellType: {
          select: {
            name: true
          }
        },
        trapType: {
          select: {
            name: true
          }
        }
      },
      where: {
        slug: slug
      }
    })

    // console.log({ card })
    // console.log({ 'card.monsterPrimaryTypesCard': card?.monsterPrimaryTypesCard })

    if (!card) return null

    // const {} = card

    return {
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
      typeOfCard: card.typeOfCard.name,
      attribute: card.attribute?.name,
      type: card.type?.name,
      monsterInvocation: card.monsterInvocation?.name,
      monsterPrimaryTypes: card.monsterPrimaryTypesCard.map(monsterPrimaryType => monsterPrimaryType.monsterPrimaryType.name),
      monsterSecondaryTypes: card.monsterSecondaryTypes?.name,
      monsterAbility: card.monsterAbility?.name,
      linkArrows: card.LinkArrowsCard.map(linkArrowsCard => linkArrowsCard.linkArrows.name),
      spellType: card.spellType?.name,
      trapType: card.trapType?.name
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error getting card')
  }
}