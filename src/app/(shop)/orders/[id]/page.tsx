import { QuantitySelector } from "@/components/card/quantity-selector/QuantitySelector";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed-yugioh";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const cardsInCart = [
  initialData.cards[0],
  initialData.cards[1],
  initialData.cards[2],
]

interface Props {
  params: {
    id: string
  }
}

export default function OrderByIdPage ({ params }: Props) {
  const { id } = params

  // Verify id, redirect 


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': false,
                  'bg-green-700': true,
                }
              )
            }>
              <IoCartOutline size={30} />
              {/* <span className="mx-2">Pending...</span> */}
              <span className="mx-2">Paid</span>
            </div>
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
              <div className={
                clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    'bg-red-500': false,
                    'bg-green-700': true,
                  }
                )
              }>
                <IoCartOutline size={30} />
                {/* <span className="mx-2">Pending...</span> */}
                <span className="mx-2">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}