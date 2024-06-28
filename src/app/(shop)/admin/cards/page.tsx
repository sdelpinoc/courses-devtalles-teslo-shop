import Image from "next/image"
import { redirect } from "next/navigation"
import Link from "next/link"

import { Pagination } from "@/components/ui/pagination/Pagination"
import { Title } from "@/components/ui/title/Title"
import { getPaginatedCardsWithImages } from "@/actions/card/card-pagination"
import { currencyFormat } from "@/utils/currencyFormat"
import { CardImage } from "@/components/card/card-image/CardImage"

interface Props {
  searchParams: {
    page: string
  }
}

export default async function OrdersPage ({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { cards, totalPages } = await getPaginatedCardsWithImages({ page, take: 10 })

  if (cards.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title title="Cards maintenance" />
      <div className="flex justify-end mb-5">
        <Link href="/admin/card/new" className="btn-primary">
          New card
        </Link>
      </div>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Image
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Type
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Rarity
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Inventory
              </th>
            </tr>
          </thead>
          <tbody>
            {
              cards.map(card => (
                <tr key={card.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/card/${card.slug}`}>
                      <CardImage
                        src={card.images[0]}
                        height={80}
                        width={80}
                        alt={card.name}
                        className="w-20 rounded"
                      />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/card/${card.slug}`} className="hover:underline">
                      {card.name}
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {card.typeOfCard}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {currencyFormat(card.price)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {card.rarities.map(rarity => rarity).join(', ')}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {card.inStock}
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
