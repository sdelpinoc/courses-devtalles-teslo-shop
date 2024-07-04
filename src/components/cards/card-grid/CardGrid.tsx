import { Card } from "@/interfaces/card.interface"
import { CardGridItem } from "./CardGridItem"

interface Props {
  cards: Card[]
}

export const CardGrid = ({ cards }: Props) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(min(200px,100%),1fr))] gap-2 mb-2 sm:justify-items-center">
      {
        cards.map(card => (
          <CardGridItem key={card.password} card={card} />
          // <span style={{border: '1px solid red'}} key={card.password}>{card.name}</span>
        ))
      }
    </div>
  )
}