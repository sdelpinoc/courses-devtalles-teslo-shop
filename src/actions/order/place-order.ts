'use server'

import { auth } from "@/auth.config"
import type { Address } from "@/interfaces/address.interface"
import type { Rarities } from "@/interfaces/card.interface"
import prisma from "@/lib/prisma"

interface ItemsToOrder {
  id: string
  quantity: number
  rarity: Rarities
}

export const placeOrder = async (cardsId: ItemsToOrder[], address: Address) => {
  const session = await auth()

  const userId = session?.user.id

  if (!userId) {
    return {
      ok: false,
      message: 'Invalid user session'
    }
  }
  // console.log({ cardsId, address, userId })

  // Get the cards
  const cards = await prisma.card.findMany({
    where: {
      id: {
        in: cardsId.map(item => item.id)
      }
    }
  })
  // console.log({ cards })

  // Calculate the items quantity
  const itemsInOrder = cardsId.reduce((total, item) => {
    return total + item.quantity
  }, 0)
  console.log({ itemsInOrder })

  // Calculate sub-total, total and tax
  const { subTotal, total, tax } = cardsId.reduce((totals, item) => {
    const productsQuantity = item.quantity
    const card = cards.find(card => card.id === item.id)

    if (!card) throw new Error(`${item.id} not exists`)

    const subTotal = card.price * productsQuantity

    totals.subTotal += subTotal

    totals.tax += subTotal * .15

    totals.total += subTotal * 1.15

    return totals
  }, { subTotal: 0, total: 0, tax: 0 })
  console.log({ subTotal, total, tax })

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Update cards stocks
      const updatedCardsPromises = cards.map(card => {

        // Accumulate cards quantity
        const cardQuantity = cardsId.filter(
          c => c.id === card.id
        ).reduce((acc, item) => {
          return acc + item.quantity
        }, 0)

        if (cardQuantity === 0) throw new Error(`${card.id}, does not have a defined quantity`)

        return tx.card.update({
          where: {
            id: card.id
          },
          data: {
            // inStock: card.inStock - cardQuantity
            // We need to update to quantity based in the actual stock of the card
            inStock: {
              decrement: cardQuantity
            }
          }
        })
      })

      const updatedCards = await Promise.all(updatedCardsPromises)

      updatedCards.forEach(card => {
        if (card.inStock <= 0) {
          throw new Error(`${card.name} not have enough inventory`)
        }
      })

      // 2. Create order header, and details
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,
          OrderItem: {
            createMany: {
              data: cardsId.map(item => ({
                quantity: item.quantity,
                rarity: item.rarity,
                cardId: item.id,
                price: cards.find(card => card.id === item.id)?.price ?? 0
              }))
            }
          }
        }
      })
      // console.log({ order })
      // 2.1, if the price is 0, throw a exception
      const orders = await tx.order.findMany({
        where: {
          id: order.id
        },
        include: {
          OrderItem: {
            select: {
              price: true
            }
          }
        }
      })
      // console.log({ orders: orders.map(o => o.OrderItem) })

      orders.map(ord => {
        const isPriceCero = ord.OrderItem.find(orderItem => orderItem.price === 0)
        if (isPriceCero) throw new Error('Your order could not be processed')
      })

      // 3. Create order address
      // const country = await tx.country.findFirst({ where: { id: address.country } })

      // if (!country) throw new Error('Your order could not be processed(2)')

      const { country, ...restAddress } = address

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id
        }
      })

      return {
        updatedCards: updatedCards,
        order: order,
        orderAddress: orderAddress
      }
    })

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx
    }
  } catch (error) {
    let message

    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }

    return {
      ok: false,
      message
    }
  }
}