'use client'

import { useEffect, useState } from "react"

import Link from "next/link"

import { QuantitySelector } from "@/components/card/quantity-selector/QuantitySelector"
import { useCartStore } from "@/store/cart/cart-store"
import { CardImage } from "@/components/card/card-image/CardImage"

export const CardsInCart = () => {
  const [loaded, setLoaded] = useState(false)
  const updateCardQuantity = useCartStore(state => state.updateCardQuantity)
  const removeCard = useCartStore(state => state.removeCard)
  const cardsInCart = useCartStore(state => state.cart)


  // For hydration problems 
  useEffect(() => {
    // console.log({ cardsInCart })
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p>Loading cart...</p>
  }

  return (
    <>
      {
        loaded && cardsInCart.map(card => (
          <div key={`${card.password}-${card.rarity}`} className="flex gap-2 mb-5">
            <CardImage src={card.image} alt={card.name} width={100} height={50} className="mr-5 rounded" />
            <div>
              <Link className="hover:underline cursor-pointer" href={`/card/${card.slug}`}>{card.name}</Link>
              <span className="text-xs block">Rarity: {card.rarity}</span>
              <p>${card.price}</p>
              <QuantitySelector quantity={card.quantity} onQuantityChanged={quantity => updateCardQuantity(card, quantity)} />
              <button
                className="underline mt-3"
                onClick={() => removeCard(card)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}