'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import clsx from "clsx"

import { placeOrder } from "@/actions/order/place-order"
import { useAddressStore } from "@/store/address/address-store"
import { useCartStore } from "@/store/cart/cart-store"
import { currencyFormat } from "@/utils/currencyFormat"
// import { sleep } from "@/utils/sleep"

export const PlaceOrder = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation())

  const address = useAddressStore(state => state.address)
  const cart = useCartStore(state => state.cart)
  const totalItemsInCart = useCartStore(state => state.getTotalItems())
  const clearCart = useCartStore(state => state.clearCart)

  useEffect(() => {
    setLoaded(true)

    if (totalItemsInCart === 0) {
      router.replace('/empty')
      return
    }
  }, [])

  const onPlaceOrder = async () => {
    // console.log({ cart })
    // console.log({ address })
    setIsPlacingOrder(true)
    setErrorMessage('')
    const cardsToOrder = cart.map(item => ({ id: item.id, quantity: item.quantity, rarity: item.rarity }))
    // console.log({ cardsToOrder })

    const response = await placeOrder(cardsToOrder, address)
    // console.log({ response })
    // await sleep(3)

    if (!response.ok) {
      setIsPlacingOrder(false)
      setErrorMessage(response.message!)
      return
    }

    //* Order went well
    clearCart()
    router.replace('/orders/' + response.order?.id)
    return
  }

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl font-bold mb-2">Delivery address</h2>
      <div className="mb-10">
        <p className="text-xl">{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.postalCode}</p>
        <p>Phone: {address.phone}</p>
      </div>
      {/* Divider */}
      <div className="w-full h-0.5 rounded border-t border-t-gray-200 mb-10" />
      <h2 className="text-2xl mb-2">Resume</h2>
      <div className="grid grid-cols-2">
        <span>Product qty.</span>
        <span className="text-right">{itemsInCart} {(itemsInCart > 1) ? 'cards' : 'card'}</span>

        <span>Subtotal.</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Taxes(15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-right text-2xl mt-5">{currencyFormat(total)}</span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-sm">
            By clicking confirm order, you agree to our <Link href="#" className="underline">terms and conditions</Link> and <Link href="#" className="underline">privacy policy</Link>
          </span>
        </p>
        {/* href="/orders/123" */}
        {
          (errorMessage) && <p className="text-red-500">{errorMessage}</p>
        }
        <button
          onClick={onPlaceOrder}
          className={
            clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            })}
          disabled={isPlacingOrder}
        >{isPlacingOrder ? 'Placing order...' : 'Confirm order'}
        </button>
      </div>
    </div>
  )
}
