export const revalidate = 60 // 60 seconds

import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

import lodash from "lodash"

import { CardGrid } from "@/components/cards/card-grid/CardGrid"
import { Title } from "@/components/ui/title/Title"
import { Pagination } from "@/components/ui/pagination/Pagination"

import { TypeOfCard } from "@/interfaces/card.interface"
import { getPaginatedCardsWithImages } from "@/actions/card/card-pagination"

interface Props {
  params: {
    typeOfCard: TypeOfCard
  },
  searchParams: {
    page?: string
  }
}

export async function generateMetadata (
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { typeOfCard } = params

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${lodash.upperFirst(typeOfCard)}s` ?? '',
    openGraph: {
      images: [...previousImages],
    },
  }
}

export default async function CardsByTypeOfCardPage ({ params, searchParams }: Props) {
  // console.log({searchParams})
  const { typeOfCard } = params
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const labels: Record<TypeOfCard, string> = {
    MONSTER: 'Monster',
    SPELL: 'Spell',
    TRAP: 'Traps'
  }

  const cardType = typeOfCard.toUpperCase() as TypeOfCard

  if (!Object.keys(labels).includes(cardType)) {
    notFound()
  }

  const { cards: filteredCards, totalPages } = await getPaginatedCardsWithImages({ page: +page, typeOfCard: cardType })
  // console.log({ filteredCards })
  // const filteredCards = cards.filter(card => card.typeOfCard === typeOfCard.toUpperCase())
  return (
    <div>
      <Title
        title={`${labels[cardType]} cards`}
        // subtitle={`${typeOfCard.toUpperCase()} cards`}
        className="mb-2"
      />
      <CardGrid
        cards={filteredCards}
      />
      <Pagination totalPages={totalPages} />
    </div>
  )
}