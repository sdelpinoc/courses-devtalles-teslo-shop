import { CartCard } from "@/interfaces/card.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartCard[]

  getTotalItems: () => number
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  }

  addProductoToCart: (card: CartCard) => void
  updateCardQuantity: (card: CartCard, quantity: number) => void
  removeCard: (card: CartCard) => void
  clearCart: () => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get()

        const totalItems = cart.reduce((total, item) => {
          // total = total + item.quantity
          return total + item.quantity
        }, 0)

        return totalItems
      },
      getSummaryInformation: () => {
        const { cart } = get()

        const subTotal = cart.reduce((subTotal, item) => {
          // console.log({ item })
          return subTotal + (item.quantity * item.price)
        }, 0)

        // console.log({ subTotal })

        const tax = subTotal * .15
        const total = subTotal + tax

        const itemsInCart = cart.reduce((total, item) => {
          // total = total + item.quantity
          return total + item.quantity
        }, 0)

        return {
          subTotal,
          tax,
          total,
          itemsInCart
        }
      },
      addProductoToCart: (card: CartCard) => {
        const { cart } = get()

        // 1. Check if the card exists with the rarity in the cart
        const cardInCart = cart.some(
          (item) => item.id === card.id && item.rarity === card.rarity
        )

        if (!cardInCart) {
          set({ cart: [...cart, card] })
          return
        }

        // 2. The cart exists with the rarity in the cart, so we increase in 1 the quantity
        const updatedCartCards = cart.map(item => {
          if (item.id === card.id && item.rarity === card.rarity) {
            return { ...item, quantity: item.quantity + card.quantity }
          }

          return item
        })

        set({ cart: updatedCartCards })
      },
      updateCardQuantity: (card: CartCard, quantity: number) => {
        const { cart } = get()

        const updatedCart = cart.map(item => {
          if (card.id === item.id && card.rarity === item.rarity) {
            return {
              ...item,
              quantity: quantity
            }
          }

          return item
        })

        set({
          cart: updatedCart
        })
      },
      removeCard: (card: CartCard) => {
        const { cart } = get()
        console.log({ cart })
        // const updatedCartCards = cart.filter(item => `${item.id}${item.rarity}` !== `${card.id}${card.rarity}`)
        // baby - normal(remove)

        // 1. nue - normal  -> V || F -> ✔️
        // 2. baby - normal -> F || F -> ❌
        // 3. baby - rare   -> V || V -> ✔️
        // const updatedCart = cart.filter(item => item.id !== card.id || item.rarity !== card.rarity)
        const updatedCart = cart.filter(item => !(item.id === card.id && item.rarity === card.rarity))
        console.log({ updatedCart })
        set({
          cart: updatedCart
        })
      },
      clearCart: () => {
        set({ cart: [] })
      }
    }),
    {
      name: 'shopping-cart',
      // skipHydration: true
    }
  )
)