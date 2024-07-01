'use client'

import { useCartStore } from "@/store/cart/cart-store"
import { useEffect, useState } from "react"
import { currencyFormat } from "@/utils/currencyFormat"
import { CardImage } from "@/components/card/card-image/CardImage"

export const CardsInCart = () => {
  const [loaded, setLoaded] = useState(false)
  const cardsInCart = useCartStore(state => state.cart)

  // For hydration problems 
  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p>Loading checkout...</p>
  }

  return (
    <>
      {
        loaded && cardsInCart.map(card => (
          <div key={`${card.password}-${card.rarity}`} className="flex gap-2 mb-5">
            <CardImage src={card.image} alt={card.name} width={100} height={50} className="mr-5 rounded" />
            <div>
              <span>{card.name} ({card.quantity})</span>
              <span className="text-xs block">Rarity: {card.rarity}</span>
              <p className="font-bold">{currencyFormat(card.price * card.quantity)}</p>
            </div>
          </div>
        ))
      }
    </>
  )
}