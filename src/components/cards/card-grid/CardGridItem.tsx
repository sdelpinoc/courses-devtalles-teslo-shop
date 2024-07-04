// 'use client'
import { Card } from "@/interfaces/card.interface"
import Image from "next/image"
import Link from "next/link"

import lodash from "lodash"
import { CardImage } from "@/components/card/card-image/CardImage"
// import { useState } from "react"

interface Props {
  card: Card
}

export const CardGridItem = ({ card }: Props) => {
  // const [zIndex, setZIndex] = useState(0)

  // const styles = { zIndex: zIndex }

  let bgCardColor = ''
  if (card.typeOfCard === 'MONSTER') {
    if (card.monsterInvocation === 'LINK') {
      bgCardColor = `hover:bg-monster-link`
    } else if (card.monsterInvocation === 'SYNCHRO') {
      bgCardColor = `hover:bg-monster-synchro`
    } else if (card.monsterInvocation === 'FUSION') {
      bgCardColor = `hover:bg-monster-fusion`
      if (card.monsterPrimaryTypes?.includes('PENDULUM')) {
        bgCardColor = `hover:bg-gradient-to-b from-monster-fusion/80 to-spell/40`
      }
    } else if (card.monsterInvocation === 'RITUAL') {
      bgCardColor = `hover:bg-monster-ritual`
    } else if (card.monsterInvocation === 'XYZ') {
      bgCardColor = `hover:bg-monster-xyz/40`
      if (card.monsterPrimaryTypes?.includes('PENDULUM')) {
        bgCardColor = `hover:bg-gradient-to-b from-monster-xyz/80 to-spell/40`
      }
    } else if (card.monsterInvocation === 'PENDULUM') {
      // hover:bg-gradient-to-r from-monster-normal-bg to-monster-effect-bg
      if (card.monsterPrimaryTypes?.includes('EFFECT')) {
        bgCardColor = `hover:bg-gradient-to-b from-monster-effect/80 to-spell/40`
      } else if (card.monsterPrimaryTypes?.includes('NORMAL')) {
        bgCardColor = `hover:bg-gradient-to-b from-monster-normal/80 to-spell/40 `
      }
    } else {
      if (card.monsterPrimaryTypes?.includes('EFFECT')) {
        bgCardColor = `hover:bg-monster-effect`
      } else if (card.monsterPrimaryTypes?.includes('NORMAL')) {
        bgCardColor = `hover:bg-monster-normal`
      }
    }
  } else if (card.typeOfCard === 'SPELL') {
    bgCardColor = `hover:bg-spell`
  } else if (card.typeOfCard === 'TRAP') {
    bgCardColor = `hover:bg-trap`
  }

  return (
    <div className={`p-4 rounded-md fade-in ${bgCardColor} hover:bg-opacity-50`}>
      <Link href={`/card/${lodash.kebabCase(card.name)}`}>
        <CardImage
          src={card.images[0]}
          alt={card.name}
          className="w-[200px] object-cover sm:hover:scale-150 transition-all duration-500 ease-in-out"
          height={200}
          width={200}
          // sizes="100vw"
          // style={{ width: '100%', height: 'auto', }}
          // style={styles}
          // onMouseEnter={() => setZIndex(10)}
          // onMouseLeave={() => setZIndex(0)}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link href={`/card/${lodash.kebabCase(card.name)}`}>
          {card.name}
        </Link>
        <span className="font-bold">${card.price}</span>
      </div>
    </div>
  )
}