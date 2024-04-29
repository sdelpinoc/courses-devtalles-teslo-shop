'use client'

import Link from "next/link"

import { useCartStore } from "@/store/cart/cart-store"
import { useEffect, useState } from "react"
import { currencyFormat } from "@/utils/currencyFormat"

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <p>Loading resume...</p>

  return (
    <>
      {
        loaded && (
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resume</h2>
            <div className="grid grid-cols-2">
              <span>Product qty.</span>
              <span className="text-right">{itemsInCart} card{itemsInCart > 1 ? 's' : ''}</span>

              <span>Subtotal.</span>
              <span className="text-right">{currencyFormat(subTotal)}</span>

              <span>Taxes(15%)</span>
              <span className="text-right">{currencyFormat(tax)}</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right text-2xl mt-5">{currencyFormat(total)}</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link className="flex btn-primary justify-center" href="/checkout/address">Checkout</Link>
            </div>
          </div>
        )
      }
    </>
  )
}