'use server'

import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"
import { Card } from "@prisma/client"
import { z } from "zod"

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

const cardSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z.string().min(3).max(255),
  password: z.string().min(3).max(255).transform(val => Number(val)),
  slug: z.string().min(3).max(255),
  cardText: z.string().min(3),
  price: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform(val => Number(val.toFixed(2))),
  // raritiesId: z.coerce.string().uuid().transform(val => val.split(',')),
  raritiesId: z.string()
    .refine((uuidValue) => uuidValue.split(',').every((item) => z.string().uuid().safeParse(item).success), { message: 'Invalid rarity/s' })
    .transform(val => val.split(',')),
  typeOfCardId: z.string().uuid(),

  attributeId: z.string().uuid().optional().or(z.literal('')),
  typeId: z.string().uuid().optional().or(z.literal('')),
  monsterInvocationId: z.string().uuid().optional().or(z.literal('')),
  // monsterPrimaryTypesId: z.coerce.string().uuid().transform(val => val.split(',')).optional(),
  monsterPrimaryTypesId: z.string()
    .refine((uuidValue) => uuidValue.split(',').every((item) => z.string().uuid().safeParse(item).success))
    .transform(val => val.split(','))
    .optional()
    .or(z.literal('')),
  monsterSecondaryTypeId: z.string().uuid().optional().or(z.literal('')),
  monsterAbilitiesId: z.string().uuid().optional().or(z.literal('')),

  level: z.coerce.number().optional(),
  rank: z.coerce.number().optional(),
  link: z.coerce.number().optional(),

  attack_points: z.string().optional(),
  defense_points: z.string().optional(),

  pendulumEffect: z.string().min(3).optional().or(z.literal('')),
  pendulumScale: z.coerce.number().optional(),

  // linkArrowsId: z.coerce.string().uuid().transform(val => val.split(',')).optional().or(z.literal('')),
  linkArrowsId: z.string()
    .refine((uuidValue) => uuidValue.split(',').every((item) => z.string().uuid().safeParse(item).success))
    .transform(val => val.split(','))
    .optional()
    .or(z.literal('')),

  spellTypeId: z.string().uuid().optional().or(z.literal('')),
  trapTypeId: z.string().uuid().optional().or(z.literal('')),
}).superRefine(async (data, ctx) => {
  const typeOfCard = await getTypeOfCardById(data.typeOfCardId)
  // console.log({ typeOfCard })

  if (typeOfCard?.name === 'Spell') {
    const spellSchema = z.object({
      spellTypeId: z.string().uuid()
    })

    // console.log({ spellTypeId: data.spellTypeId })
    const spellParsed = spellSchema.safeParse({ spellTypeId: data.spellTypeId })
    // console.log({ spellParsed })
    if (!spellParsed.success) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid type of spell',
        path: ['spellTypeId']
      })
    }
  }

  if (typeOfCard?.name === 'Trap') {
    const trapSchema = z.object({
      spellTypeId: z.string().uuid()
    })

    // console.log({ spellTypeId: data.spellTypeId })
    const trapParsed = trapSchema.safeParse({ spellTypeId: data.spellTypeId })
    // console.log({ trapParsed })
    if (!trapParsed.success) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid type of trap',
        path: ['trapTypeId']
      })
    }
  }
})

export const createUpdateCard = async (formData: FormData) => {
  // console.log({ formData: formData })

  const data = Object.fromEntries(formData)
  // console.log({ data })
  const cardParsed = await cardSchema.safeParseAsync(data)

  if (!cardParsed.success) {
    // console.log({ 'cardParsed.error.errors': cardParsed.error.errors })
    // cardParsed.error.errors.map(error => error.message).join(', ')
    return {
      ok: false,
      message: cardParsed.error.errors.map(error => error.message).join(', ')
    }
  }

  // console.log(cardParsed.data)

  const cardFromForm = cardParsed.data

  const {
    id,
    raritiesId,
    monsterPrimaryTypesId,
    linkArrowsId,
    typeOfCardId: typeOfCard,
    attributeId: attribute,
    typeId: type,
    monsterInvocationId: monsterInvocation,
    monsterSecondaryTypeId: monsterSecondaryType,
    monsterAbilitiesId: monsterAbilities,
    spellTypeId: spellType,
    trapTypeId: trapType,
    ...rest
  } = cardFromForm

  try {
    // This transaction must return the created or updated card
    const prismaTx = await prisma.$transaction(async (tx) => {
      let card: Card

      if (id) {
        // Update
        card = await prisma.card.update({
          where: { id },
          data: {
            typeOfCardId: typeOfCard,
            attributeId: attribute === '' ? null : attribute,
            typeId: type === '' ? null : type,
            monsterInvocationId: monsterInvocation === '' ? null : monsterInvocation,
            // monsterSecondaryTypeId: monsterSecondaryType,
            monsterAbilityId: monsterAbilities === '' ? null : monsterAbilities,
            spellTypeId: spellType === '' ? null : spellType,
            trapTypeId: trapType === '' ? null : trapType,
            ...rest
          }
        })

        // console.log({ cardUpdated: card })

        // Delete relations with rarities
        await prisma.rarityCard.deleteMany({
          where: { cardId: id }
        })
        // Delete relations with monsterPrimaryTypes
        await prisma.monsterPrimaryTypesCard.deleteMany({
          where: { cardId: id }
        })
        // Delete relations with linkArrowsId
        await prisma.linkArrowsCard.deleteMany({
          where: { cardId: id }
        })

        // Insert relations with rarities
        await prisma.rarityCard.createMany({
          data: raritiesId.map(rarity => ({
            cardId: id,
            rarityId: rarity
          }))
        })
        // Insert relations with monsterPrimaryTypes
        if (monsterPrimaryTypesId) {
          await prisma.monsterPrimaryTypesCard.createMany({
            data: monsterPrimaryTypesId.map(monsterPrimaryType => ({
              cardId: id,
              monsterPrimaryTypeId: monsterPrimaryType
            }))
          })
        }
        // Insert relations with linkArrowsId
        if (linkArrowsId) {
          await prisma.linkArrowsCard.createMany({
            data: linkArrowsId.map(linkArrowId => ({
              cardId: id,
              linkArrowsId: linkArrowId
            }))
          })
        }
      } else {
        // Insert
        card = await prisma.card.create({
          data: {
            // raritiesId,
            // monsterPrimaryTypesId,
            // linkArrowsId,
            typeOfCardId: typeOfCard,
            attributeId: attribute === '' ? null : attribute,
            typeId: type === '' ? null : type,
            monsterInvocationId: monsterInvocation === '' ? null : monsterInvocation,
            monsterSecondaryTypesId: cardFromForm.monsterSecondaryTypeId === '' ? null : cardFromForm.monsterSecondaryTypeId,
            monsterAbilityId: cardFromForm.monsterAbilitiesId === '' ? null : cardFromForm.monsterAbilitiesId,
            spellTypeId: spellType === '' ? null : spellType,
            trapTypeId: trapType === '' ? null : trapType,
            ...rest,
            // Insert in the other tables
          }
        })

        // Insert relations with rarities
        await prisma.rarityCard.createMany({
          data: raritiesId.map(rarity => ({
            cardId: card.id,
            rarityId: rarity
          }))
        })
        // Insert relations with monsterPrimaryTypes
        if (monsterPrimaryTypesId) {
          await prisma.monsterPrimaryTypesCard.createMany({
            data: monsterPrimaryTypesId.map(monsterPrimaryType => ({
              cardId: card.id,
              monsterPrimaryTypeId: monsterPrimaryType
            }))
          })
        }
        // Insert relations with linkArrowsId
        if (linkArrowsId) {
          await prisma.linkArrowsCard.createMany({
            data: linkArrowsId.map(linkArrowId => ({
              cardId: card.id,
              linkArrowsId: linkArrowId
            }))
          })
        }
      }

      // Load and save of the images
      if (formData.getAll('images')) {
        console.log(formData.getAll('images'))
        const images = await uploadImages(formData.getAll('images') as File[])
        console.log({ images })

        if (!images) {
          throw new Error('Images could not be loaded')
        }

        await tx.cardImage.createMany({
          data: images.map(image => ({
            name: image!, // ! => Non-null Assertion Operator (Postfix !)
            cardId: card.id
          }))
        })
      }

      // This return is after the create or update
      return {
        card
      }
    })

    // Revalidate paths, this is to rebuild the page
    revalidatePath('/admin/cards/')
    revalidatePath(`/admin/card/${cardFromForm.slug}`)
    revalidatePath(`/cards/${cardFromForm.slug}`)

    return {
      ok: true,
      card: prismaTx?.card
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'The action could not be performed'
    }
  }
}

const getTypeOfCardById = (id: string) => {
  return prisma.typeOfCard.findUnique({ select: { name: true }, where: { id: id } })
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async image => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')

        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: 'teslo-shop' })
          .then(r => r.secure_url)
      } catch (error) {
        console.log(error)
        return null
      }
    })

    const uploadImages = await Promise.all(uploadPromises)

    return uploadImages
  } catch (error) {
    return null
  }
}