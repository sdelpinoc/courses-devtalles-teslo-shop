import { notFound } from "next/navigation"

import { CardGrid } from "@/components/cards/card-grid/CardGrid"
import { Title } from "@/components/ui/title/Title"
import { initialData } from "@/seed/seed-yugioh"

import { TypeOfCard } from "@/interfaces/card.interface"

interface Props {
  params: {
    id: TypeOfCard
  }
}

const cards = initialData.cards

export default function CardsByTypeOfCardPage ({ params }: Props) {
  const { id: typeOfCard } = params

  const labels: Record<TypeOfCard, string> = {
    MONSTER: 'Monster',
    SPELL: 'Spell',
    TRAP: 'Traps'
  }

  const cardType = typeOfCard.toUpperCase() as TypeOfCard

  if (!Object.keys(labels).includes(cardType)) {
    notFound()
  }

  const filteredCards = cards.filter(card => card.typeOfCard === typeOfCard.toUpperCase())

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
    </div>
  )
}