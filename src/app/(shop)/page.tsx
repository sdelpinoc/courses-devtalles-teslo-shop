
export const revalidate = 60 // 60 seconds

import { redirect } from "next/navigation";

import { getPaginatedCardsWithImages } from "@/actions/card/card-pagination";
import { CardGrid } from "@/components/cards/card-grid/CardGrid";
import { Title } from "@/components/ui/title/Title";
import { Pagination } from "@/components/ui/pagination/Pagination";
// import { initialData } from "@/seed/seed-yugioh";
// const cards = initialData.cards

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home ({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { cards, totalPages } = await getPaginatedCardsWithImages({ page })
  // console.log( {totalPages }  )

  if (cards.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title
        title="Store"
        subtitle="All the cards"
        className="mb-2"
      />
      <CardGrid
        cards={cards}
      />
      <Pagination totalPages={totalPages} />
    </>
  );
}
