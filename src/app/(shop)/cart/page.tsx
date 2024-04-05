import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";

import { QuantitySelector } from "@/components/card/quantity-selector/QuantitySelector";
import { Title } from "@/components/ui/title/Title";

import { initialData } from "@/seed/seed-yugioh";

const cardsInCart = [
  initialData.cards[0],
  initialData.cards[1],
  initialData.cards[2],
]

export default function CartPage () {
  // redirect("/empty")

  return (
    <div className="flex justify-center items-center mb-36 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Shopping cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col">
            <span className="text-xl">Add more items</span>
            <Link href="/" className="underline mb-5">Continue buying</Link>
            {/* Items */}
            {
              cardsInCart.map(card => (
                <div key={card.password} className="flex gap-2 mb-5">
                  <Image src={`/img/cards/${card.password}.jpg`} alt={card.name} width={100} height={50} className="mr-5 rounded" />
                  <div>
                    <p>{card.name}</p>
                    <p>${card.price}</p>
                    <QuantitySelector quantity={3} />
                    <button className="underline mt-3">Remove</button>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resume</h2>
            <div className="grid grid-cols-2">
              <span>Product qty.</span>
              <span className="text-right">3 cards</span>

              <span>Subtotal.</span>
              <span className="text-right">$ 100</span>

              <span>Taxes(15%)</span>
              <span className="text-right">$ 15</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right text-2xl mt-5">$ 115</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link className="flex btn-primary justify-center" href="/checkout/address">Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}