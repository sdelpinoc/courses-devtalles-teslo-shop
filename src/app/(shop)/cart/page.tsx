
import Link from "next/link";
// import { redirect } from "next/navigation";

import { Title } from "@/components/ui/title/Title";
import { CardsInCart } from "./ui/CardsInCart";
import { OrderSummary } from "./ui/OrderSymmary";

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
            <CardsInCart />
          </div>
          {/* Summary */}
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}