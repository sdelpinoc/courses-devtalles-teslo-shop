'use client'

import { QuantitySelector } from "@/components/card/quantity-selector/QuantitySelector"
import { RaritySelector } from "@/components/card/rarity-selector/RaritySelector"
import { StockLabel } from "@/components/card/stock-label/StockLabel"

import { Card, CartCard, Rarities } from "@/interfaces/card.interface"
import { useCartStore } from "@/store/cart/cart-store"
import { useState } from "react"

interface Props {
  card: Card
}

export const AddToCart = ({ card }: Props) => {
  // console.log({ card })
  const addCardToCart = useCartStore(state => state.addProductoToCart)

  const [rarity, setRarity] = useState<Rarities | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const addToCart = () => {
    setPosted(true)
    // console.log({ rarity, quantity, card })
    if (!rarity) return

    const cartCard: CartCard = {
      id: card.id,
      password: card.password,
      slug: card.slug,
      name: card.name,
      quantity: quantity,
      price: card.price,
      rarity: rarity,
      // image: `${card.password}.jpg`
      image: card.images[0]
    }

    addCardToCart(cartCard)

    setPosted(false)
    setQuantity(1)
    setRarity(undefined)
  }

  return (
    <>
      <StockLabel slug={card.slug} />
      {
        posted && !rarity && (
          <span className="text-sm text-red-500 fade-in">
            Must select a rarity
          </span>
        )
      }
      <RaritySelector availableRarities={card.rarities.map(rarity => rarity)} selectedRarity={rarity} onRarityChanged={setRarity} />
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      <button className="btn-primary my-5" onClick={addToCart}>
        Add to cart
      </button>
    </>
  )
}