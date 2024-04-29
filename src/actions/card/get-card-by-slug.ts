'use server'

import { Attributes, LinkArrows, MonsterAbilities, MonsterInvocations, MonsterPrimaryTypes, MonsterSecondaryTypes, Rarities, SpellTypes, TrapTypes, TypeOfCard, Types } from "@/interfaces/card.interface"
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
      typeOfCard: card.typeOfCard.name.toUpperCase() as TypeOfCard,
      attribute: card.attribute?.name as Attributes,
      type: card.type?.name as Types,
      monsterInvocation: card.monsterInvocation?.name.toUpperCase() as MonsterInvocations,
      monsterPrimaryTypes: card.monsterPrimaryTypesCard.map(monsterPrimaryType => monsterPrimaryType.monsterPrimaryType.name.toUpperCase()) as MonsterPrimaryTypes[],
      monsterSecondaryTypes: card.monsterSecondaryTypes?.name as MonsterSecondaryTypes,
      monsterAbility: card.monsterAbility?.name as MonsterAbilities,
      linkArrows: card.LinkArrowsCard.map(linkArrowsCard => linkArrowsCard.linkArrows.name) as LinkArrows[],
      spellType: card.spellType?.name.toUpperCase() as SpellTypes,
      trapType: card.trapType?.name.toUpperCase() as TrapTypes
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error getting card')
  }
}