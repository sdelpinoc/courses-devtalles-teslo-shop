import { Rarities } from "@/interfaces/card.interface"
import clsx from "clsx"

interface Props {
  selectedRarity?: Rarities
  availableRarities: Rarities[]

  onRarityChanged: (rarity: Rarities) => void
}

export const RaritySelector = ({ selectedRarity, availableRarities, onRarityChanged }: Props) => {
  return (
    <div className="my-2">
      <h3 className="font-bold mb-4">
        Choose rarity
      </h3>
      <div className="flex">
        {
          availableRarities?.map(rarity => (
            <button
              key={rarity}
              onClick={() => onRarityChanged(rarity)}
              className={
                clsx("mx-2 text-lg hover:underline",
                  {
                    'underline': rarity === selectedRarity
                  }
                )
              }>{rarity}</button>
          ))
        }
      </div>
    </div>
  )
}