import { QuantitySelector } from "@/components/card/quantity-selector/QuantitySelector";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed-yugioh";
import Image from "next/image";
import Link from "next/link";

const cardsInCart = [
  initialData.cards[0],
  initialData.cards[1],
  initialData.cards[2],
]

export default function CheckoutPage () {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verifying order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Check your items</span>
            <Link href="/cart" className="underline mb-5">Edit cart</Link>
            {/* Items */}
            {
              cardsInCart.map(card => (
                <div key={card.password} className="flex gap-2 mb-5">
                  <Image src={`/img/cards/${card.password}.jpg`} alt={card.name} width={100} height={50} className="mr-5 rounded" />
                  <div>
                    <p>{card.name}</p>
                    <p>${card.price} x 3</p>
                    {/* <QuantitySelector quantity={3} /> */}
                    <p className="font-bold">Subtotal: ${card.price * 3}</p>
                    <button className="underline mt-3">Remove</button>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Summary/Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">Sergio del Pino C.</p>
              <p>Pedro Lagos 44</p>
              <p>San Carlos</p>
              <p>Región de Ñuble</p>
              <p>Chile</p>
              <p>CP 33445566</p>
              <p>Phone number: 987654321</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded border-t border-t-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resume</h2>
            <div className="grid grid-cols-2">
              <span>Product qty.</span>
              <span className="text-right">9 cards</span>

              <span>Subtotal.</span>
              <span className="text-right">$ 100</span>

              <span>Taxes(15%)</span>
              <span className="text-right">$ 15</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right text-2xl mt-5">$ 115</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                <span className="text-sm">
                By clicking confirm order, you agree to our <Link href="#" className="underline">terms and conditions</Link> and <Link href="#" className="underline">privacy policy</Link>
                </span>
              </p>
              <Link className="flex btn-primary justify-center" href="/orders/123">Confirm order</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}