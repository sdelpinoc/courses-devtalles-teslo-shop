import Image from "next/image";

import clsx from "clsx";
import { IoCartOutline } from "react-icons/io5";

import { getOrderById } from "@/actions/order/get-order-by-id";
import { Title } from "@/components/ui/title/Title";
import { currencyFormat } from "@/utils/currencyFormat";
import { PayPalButton } from "@/components/paypal/PayPalButton";
import { OrderStatus } from "@/components/orders/OrderStatus";

interface Props {
  params: {
    id: string
  }
}

export default async function OrderByIdPage ({ params }: Props) {
  const { id } = params

  // Server action
  const { ok, message, order } = await getOrderById(id)

  const { firstName, lastName, address, address2, city, postalCode, phone, countryId } = { ...order?.OrderAddress }

  if (!ok || !order) {
    return <p>{message}</p>
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split('-').at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col">
            {/* <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !order.isPaid,
                  'bg-green-700': order.isPaid,
                }
              )
            }>
              <IoCartOutline size={30} />
              {
                (order.isPaid)
                  ? <span className="mx-2">Paid</span>
                  : <span className="mx-2">Pending...</span>
              }
            </div> */}
            {/* Items */}
            {
              order?.OrderItem.map(item => (
                <div key={item.card.password + '-' + item.rarity} className="flex gap-2 mb-5">
                  <Image src={`/img/cards/${item.card.password}.jpg`} alt={item.card.name} width={100} height={50} className="mr-5 rounded" />
                  <div>
                    <p>{item.card.name}</p>
                    <span className="text-xs block">Rarity: {item.rarity}</span>
                    <p>${item.price} x {item.quantity}</p>
                    <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Summary/Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 self-start">
            <h2 className="text-2xl font-bold mb-2">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">{firstName} {lastName}</p>
              <p>{address} {address2}</p>
              <p>{city}, {countryId}</p>
              <p>CP {postalCode}</p>
              <p>Phone: {phone}</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded border-t border-t-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resume</h2>
            <div className="grid grid-cols-2">
              <span>Product qty.</span>
              <span className="text-right">{order.itemsInOrder} {order.itemsInOrder > 1 ? 'cards' : 'card'}</span>

              <span>Subtotal.</span>
              <span className="text-right">{currencyFormat(order.subTotal)}</span>

              <span>Taxes(15%)</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right text-2xl mt-5">{currencyFormat(order.total)}</span>
            </div>
            <div className="mt-10 mb-2 w-full">
              {
                order.isPaid
                  ? <OrderStatus isPaid={order.isPaid} />
                  : <PayPalButton amount={order.total} orderId={order.id} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}