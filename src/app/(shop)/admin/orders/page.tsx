import Link from "next/link"
import { redirect } from "next/navigation"

import { IoCardOutline } from "react-icons/io5"

import { auth } from "@/auth.config"
import { getPaginationOrders } from "@/actions/order/get-pagination-orders"
import { Pagination } from "@/components/ui/pagination/Pagination"
import { Title } from "@/components/ui/title/Title"

interface Props {
  searchParams: {
    page: string
  }
}

export default async function OrdersPage ({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  const { ok, message, orders = [], totalPages = 1 } = await getPaginationOrders({ page, take: 2, isAdmin: session?.user.role === 'admin'})

  if (!ok) {
    return <p>{message}</p>
  }

  return (
    <>
      <Title title="All Orders" />
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Status
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(order => (
                <tr key={order.id.split('-').at(-1)} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.split('-').at(-1)}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {
                      (order.isPaid)
                        ? <><IoCardOutline className="text-green-800" />
                          <span className='mx-2 text-green-800'>Pagada</span></>
                        : <><IoCardOutline className="text-red-800" />
                          <span className='mx-2 text-red-800'>No Pagada</span></>
                    }
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      Ver orden
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Pagination totalPages={totalPages} />
    </>
  )
}
