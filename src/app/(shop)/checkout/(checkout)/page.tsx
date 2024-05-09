import Link from "next/link";

import { Title } from "@/components/ui/title/Title";
import { CardsInCart } from "./ui/CardsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage () {
  return (
    <div className="flex justify-center items-center mb-52 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verifying order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Check your items</span>
            <Link href="/cart" className="underline mb-5">Edit cart</Link>
            {/* Items */}
            <CardsInCart />
          </div>
          {/* Summary/Checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}