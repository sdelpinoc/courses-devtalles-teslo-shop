export const revalidate = 604800 // ~7 days

import Image from "next/image"
import { notFound } from "next/navigation"
import { Metadata, ResolvingMetadata } from "next"

import clsx from "clsx"
import lodash from "lodash"

import { titleFont } from "@/config/fonts"
// import { initialData } from "@/seed/seed-yugioh"

import { SlideShow } from "@/components/card/slide-show/Slideshow"
import { MobileSlideShow } from "@/components/card/slide-show/MobileSlideShow"
import { getCardBySlug } from "@/actions/card/get-card-by-slug"
import { AddToCart } from "./ui/AddToCart"
import { CardImage } from "@/components/card/card-image/CardImage"

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  const card = await getCardBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: card?.name ?? 'Card name not found',
    openGraph: {
      images: [`http://localhost:3000/img/cards/${card?.password}.jpg` || '', ...previousImages],
    },
  }
}

export default async function CardPageWithSlug ({ params }: Props) {
  const { slug } = params

  // const card = initialData.cards.find(card => lodash.kebabCase(card.name) === slug)
  const card = await getCardBySlug(slug)
  // console.log({ card })
  // console.log({ 'card.monsterPrimaryTypes': card?.monsterPrimaryTypes })

  if (!card) {
    notFound()
  }

  const cardLevel = Number(card.level ?? 0)
  const cardRank = Number(card.rank ?? 0)

  let bgCardColor = ''
  let bgCardColorBody = ''
  let borderCardColor = ''
  if (card.typeOfCard === 'MONSTER') {
    if (card.monsterInvocation === 'LINK') {
      bgCardColor = `bg-monster-link`
      bgCardColorBody = `bg-monster-link/40`
      borderCardColor = 'border-monster-link'
    } else if (card.monsterInvocation === 'SYNCHRO') {
      bgCardColor = `bg-monster-synchro`
      bgCardColorBody = `bg-monster-synchro/40`
      borderCardColor = 'border-monster-synchro'
    } else if (card.monsterInvocation === 'FUSION') {
      bgCardColor = `bg-monster-fusion`
      bgCardColorBody = `bg-monster-fusion/40`
      borderCardColor = `border-monster-fusion`
      if (card.monsterPrimaryTypes?.includes('PENDULUM')) {
        bgCardColor = `bg-gradient-to-b from-monster-fusion to-spell`
        bgCardColorBody = `bg-gradient-to-b from-monster-fusion/80 to-spell/40`
        borderCardColor = `border-monster-fusion`
      }
    } else if (card.monsterInvocation === 'RITUAL') {
      bgCardColor = `bg-monster-ritual`
      bgCardColorBody = `bg-monster-ritual/40`
      borderCardColor = `border-monster-ritual`
    } else if (card.monsterInvocation === 'XYZ') {
      bgCardColor = `bg-monster-xyz`
      bgCardColorBody = `bg-monster-xyz/40`
      borderCardColor = `border-monster-xyz`
      if (card.monsterPrimaryTypes?.includes('PENDULUM')) {
        bgCardColor = `bg-gradient-to-b from-monster-xyz to-spell`
        bgCardColorBody = `bg-gradient-to-b from-monster-xyz/50 to-spell/40`
        borderCardColor = `border-monster-xyz`
      }
    } else if (card.monsterInvocation === 'PENDULUM') {
      // gradient-to-r from-monster-normal-bg to-monster-effect-bg
      if (card.monsterPrimaryTypes?.includes('EFFECT')) {
        bgCardColor = `bg-gradient-to-b from-monster-effect to-spell`
        bgCardColorBody = `bg-gradient-to-b from-monster-effect/80 to-spell/40`
        borderCardColor = `border-monster-effect`
      } else if (card.monsterPrimaryTypes?.includes('NORMAL')) {
        bgCardColor = `bg-gradient-to-b from-monster-normal to-spell`
        bgCardColorBody = `bg-gradient-to-b from-monster-normal/80 to-spell/40`
        borderCardColor = `border-monster-normal`
      }
    } else {
      if (card.monsterPrimaryTypes?.includes('EFFECT')) {
        bgCardColor = `bg-monster-effect`
        bgCardColorBody = `bg-monster-effect/40`
        borderCardColor = `border-monster-effect`
      } else if (card.monsterPrimaryTypes?.includes('NORMAL')) {
        bgCardColor = `bg-monster-normal`
        bgCardColorBody = `bg-monster-normal/40`
        borderCardColor = `border-monster-normal`
      }
    }
  } else if (card.typeOfCard === 'SPELL') {
    bgCardColor = `bg-spell`
    bgCardColorBody = `bg-spell/40`
    borderCardColor = `border-spell`
  } else if (card.typeOfCard === 'TRAP') {
    bgCardColor = `bg-trap`
    bgCardColorBody = `bg-trap/40`
    borderCardColor = `border-trap`
  }

  const linkArrows = [
    {
      'top-left': {
        img: 'LM-TopLeft'
      },
      'top-center': {
        img: 'LM-TopCenter'
      },
      'top-right': {
        img: 'LM-TopRight'
      },
      'middle-left': {
        img: 'LM-MiddleLeft'
      },
      'middle-right': {
        img: 'LM-MiddleRight'
      },
      'bottom-left': {
        img: 'LM-BottomLeft'
      },
      'bottom-center': {
        img: 'LM-BottomCenter'
      },
      'bottom-right': {
        img: 'LM-BottomRight'
      }
    }
  ]

  // console.log({ bgCardColor })
  // console.log({ bgCardColorBody })

  return (
    <div className="border-4 border-gray-600 rounded-lg p-1 relative">
      <h1 className={`${bgCardColor} absolute font-bold text-sm sm:text-xl text-center rounded py-2 left-1 right-1`}>&nbsp;</h1>
      <h1 className={
        clsx(`${titleFont.className} antialiased font-bold text-sm sm:text-xl text-center rounded py-2 sticky top-0 ${bgCardColor} opacity-90 z-10`,
          {
            'text-white': card.monsterInvocation === 'XYZ'
          }
        )}>
        {card.name}
      </h1>
      {/* Slideshow */}
      <div className={clsx(`grid grid-cols-1 mt-2 gap-1 lg:grid-cols-3`, {
        "justify-items-center items-center": card.images.length === 1
      })}>
        <div className="col-span-1 lg:col-span-1">
          {
            card.images.length > 1
              ? (
                <>
                  {/* Mobile Slideshow */}
                  <MobileSlideShow
                    title={card.name}
                    images={card.images}
                    className="block md:hidden"
                  />
                  {/* Desktop slideshow */}
                  <SlideShow
                    title={card.name}
                    images={card.images}
                    className="hidden md:block"
                  />
                </>
              )
              : <CardImage src={`${card.images[0]}`} alt={card.name} width={300} height={437} />
          }
          {/* Mobile slideshow */}
        </div>
        {/* Details */}
        <div className={`col-span-2 px-5 ${bgCardColorBody} rounded w-full`}>
          {/* Card type */}
          {/* Select quantity */}

          {/* Information */}
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex">
              <p className="font-bold mr-1">Card Type:</p>
              <span>
                {lodash.capitalize(card.typeOfCard)}
              </span>
              {
                card.typeOfCard === 'SPELL' && (<Image className="inline ml-1 align-middle" src={`/img/Spell.svg`} alt={card.typeOfCard} width={28} height={28} />)
              }
              {
                card.typeOfCard === 'TRAP' && (<Image className="inline ml-1 align-middle" src={`/img/Trap.svg`} alt={card.typeOfCard} width={28} height={28} />)
              }
            </div>
            {
              card.typeOfCard === 'SPELL' &&
              (
                <div className="flex">
                  <p className="font-bold mr-1">Property:</p>
                  <span>{card.spellType}</span>
                  <Image className="inline ml-2 align-middle" src={`/img/spells/${card.spellType}.svg`} alt={card.spellType as string} width={28} height={28} />
                </div>
              )
            }
            {
              card.typeOfCard === 'TRAP' &&
              (
                <div className="flex">
                  <p className="font-bold mr-1">Property:</p>
                  <span>{card.trapType}</span>
                  <Image className="inline ml-2 align-middle" src={`/img/traps/${card.trapType}.svg`} alt={card.trapType as string} width={28} height={28} />
                </div>
              )
            }
            {
              card.typeOfCard === 'MONSTER' && (
                <div className="flex">
                  <p className="font-bold mr-1">Attribute:</p>
                  <span>{card.attribute}</span>
                  <Image className="inline ml-2" src={`/img/attributes/${card.attribute}.svg`} alt="Attribute" width={28} height={28} />
                </div>
              )
            }
            {
              card.typeOfCard === 'MONSTER' && (
                <div className="flex">
                  {/* Types/MonsterInvocation?/MonsterAbility?/MonsterSecondaryType?/MonsterPrimaryType? */}
                  <p className="font-bold mr-1">Types:</p>
                  <span>
                    {card.type} {card.monsterInvocation ? ` / ${lodash.capitalize(card.monsterInvocation)}` : ''}{card.monsterAbility ? ` / ${lodash.capitalize(card.monsterAbility)}` : ``}{card.monsterSecondaryTypes ? ` / ${lodash.capitalize(card.monsterSecondaryTypes)}` : ``} {card.monsterPrimaryTypes ? ` / ${card.monsterPrimaryTypes.map(lodash.capitalize).join(' / ')}` : ``}</span>
                </div>

              )
            }
            {
              (card.typeOfCard === 'MONSTER') && (card.monsterInvocation !== 'LINK' && card.monsterInvocation !== 'XYZ') && (
                <div className="flex">
                  <p className="font-bold mr-1">Level:</p>
                  <span>
                    {card.level}
                  </span>
                  {
                    [...Array(cardLevel)].map((_, index) => {
                      return (
                        <Image key={`level_${index}`} className="inline ml-1" src={`/img/CG_Star.svg`} alt="Level" width={18} height={24} />
                      )
                    }
                    )}
                </div>
              )
            }
            {
              card.monsterInvocation === 'XYZ' && (
                <div className="flex">
                  <p className="font-bold mr-1">Rank:</p>
                  <span>
                    {card.rank}
                  </span>
                  {
                    [...Array(cardRank)].map((_, index) => (
                      <Image key={`rank_${index}`} className="inline ml-1" src={`/img/Rank_Star.svg`} alt="Rank" width={18} height={24} />)
                    )
                  }
                </div>
              )
            }
            {
              card.monsterInvocation === 'PENDULUM' && (
                <div className="flex">
                  <p className="font-bold mr-1">Pendulum scale:</p><Image className="inline align-middle mr-1" src={`/img/Pendulum_Scale.png`} alt="Pendulum Scale" width={20} height={20} /><span>{card.pendulumScale}</span>
                </div>
              )
            }
            {
              card.typeOfCard === 'MONSTER' && card.monsterInvocation === 'LINK' && (
                <div className="flex">
                  <p className="font-bold mr-1">Links Arrows:</p>
                  {
                    Object.values(linkArrows).map((arrow, index) => (
                      <span key={index} className="relative w-[36px] h-[36px]">
                        <span className="absolute top-0 left-0 aspect-auto">
                          <Image
                            src={`/img/arrows/${(card.linkArrows?.includes('Top-Left'))
                              ? arrow["top-left"].img
                              : arrow["top-left"].img + 2
                              }.png`}
                            alt="Top-left arrow"
                            width={10}
                            height={10}
                          />
                        </span>
                        <span className="absolute top-0 left-[10px] aspect-auto">
                          <Image src={`/img/arrows/${(card.linkArrows?.includes('Top-Center'))
                            ? arrow["top-center"].img
                            : arrow["top-center"].img + 2
                            }.png`} alt="Top-center arrow" width={15} height={10} />
                        </span>
                        <span className="absolute top-0 right-0">
                          <Image src={`/img/arrows/${(card.linkArrows?.includes('Top-Right'))
                            ? arrow["top-right"].img
                            : arrow["top-right"].img + 2
                            }.png`} alt="Top-right arrow" width={10} height={10} />
                        </span>

                        <span className="absolute top-[10px] left-0 aspect-auto">
                          <Image src={`/img/arrows/${(card.linkArrows?.includes('Middle-Left'))
                            ? arrow["middle-left"].img
                            : arrow["middle-left"].img + 2
                            }.png`} alt="Middle-left arrow" width={10} height={15} />
                        </span>
                        <span className="absolute top-[10px] right-0 aspect-auto">
                          <Image src={`/img/arrows/${(card.linkArrows?.includes('Middle-Left'))
                            ? arrow["middle-right"].img
                            : arrow["middle-right"].img + 2
                            }.png`} alt="Middle-right arrow" width={10} height={15} />
                        </span>

                        <span className="absolute bottom-0 left-0 aspect-auto">
                          <Image src={`/img/arrows/${(card.linkArrows?.includes('Bottom-Left'))
                            ? arrow["bottom-left"].img
                            : arrow["bottom-left"].img + 2
                            }.png`} alt="Bottom-left arrow" width={10} height={10} />
                        </span>
                        <span className="absolute bottom-0 left-[10px] aspect-auto">
                          <Image src={`/img/arrows/${(card.linkArrows?.includes('Bottom-Center'))
                            ? arrow["bottom-center"].img
                            : arrow["bottom-center"].img + 2
                            }.png`} alt="Bottoms-center arrow" width={15} height={10} />
                        </span>
                        <span className="absolute bottom-0 right-0">
                          <Image src={`/img/arrows/${(card.linkArrows?.includes('Bottom-Right'))
                            ? arrow["bottom-right"].img
                            : arrow["bottom-right"].img + 2
                            }.png`} alt="Bottom-right arrow" width={10} height={10} />
                        </span>
                      </span>
                    ))
                  }
                  <span className="ml-2">{card.linkArrows?.join(', ')}</span>
                </div>
              )
            }
            {
              card.typeOfCard === 'MONSTER' && card.monsterInvocation !== 'LINK' && (
                <div className="flex">
                  <p className="font-bold mr-1">ATK / DEF:</p><span>{card.attack_points} / {card.defense_points}</span>
                </div>
              )
            }
            {
              card.typeOfCard === 'MONSTER' && card.monsterInvocation === 'LINK' && (
                <div className="flex">
                  <p className="font-bold mr-1">ATK / LINK:</p><span>{card.attack_points} / {card.link}</span>
                </div>
              )
            }
            <div className="flex">
              <p className="font-bold mr-1">Password:</p><span>{card.password}</span>
            </div>
          </div>
          {/* Description */}
          <h3 className="font-bold mt-2">Description:</h3>
          {
            card.monsterPrimaryTypes?.includes('PENDULUM')
              ? (
                <div className={`bg-white p-2 border-2 ${borderCardColor} border rounded`}>
                  <span className="font-semibold block">Pendulum Effect</span>
                  <pre className="whitespace-pre-wrap font-normal font-sans">{card.pendulumEffect}</pre>
                  <span className="font-semibold block mt-2">Card Effect</span>
                  <pre className="whitespace-pre-wrap font-normal font-sans">{card.cardText}</pre>
                </div>
              ) : (
                <pre className={`bg-white p-2 border-2 ${borderCardColor} rounded whitespace-pre-wrap font-normal font-sans`}>
                  {card.cardText}
                </pre>
              )
          }
          <h3 className="font-bold mt-2">Price:</h3>
          <p className="text-lg mb-5">
            ${card.price}
          </p>
          <AddToCart card={card} />
        </div>
      </div>
    </div>
  )
}