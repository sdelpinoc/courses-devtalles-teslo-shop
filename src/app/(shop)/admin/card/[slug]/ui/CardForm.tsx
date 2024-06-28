"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import clsx from "clsx";
import { useForm } from "react-hook-form";
import lodash from "lodash"

import { Card } from "@/interfaces/card.interface";
import { createUpdateCard } from "@/actions/card/create-update-card";
import { CardImage } from "@/components/card/card-image/CardImage";
import { deleteCardImage } from "@/actions/card/delete-card-image";

interface FormField {
  id: string
  name: string
}

interface FormCard extends Card {
  RarityCard: {
    cardId: string
    id: string
    rarity: { name: string },
    rarityId: string
  }[],
  monsterPrimaryTypesCard?: {
    monsterPrimaryType: { name: string; }
    id: string;
    monsterPrimaryTypeId: string;
    cardId: string;
  }[],
  LinkArrowsCard?: {
    cardId: string
    id: string;
    linkArrows: { name: string };
    linkArrowsId: string;
  }[],
  cardImage?: {
    id: number,
    name: string
  }[]
}

interface Props {
  card: Partial<FormCard>;
  fieldsData: {
    typesOfCard: FormField[]
    attributes: FormField[]
    types: FormField[]
    monsterInvocations: FormField[]
    monsterPrimaryTypes: FormField[]
    monsterSecondaryTypes: FormField[]
    monsterAbilities: FormField[]
    linkArrows: FormField[]
    rarities: FormField[]
    spellTypes: FormField[]
    trapTypes: FormField[]
  }
}

interface FormInputs {
  name: string
  password: number
  cardText: string
  price: number
  inStock: number
  raritiesId: string[]
  typeOfCardId: string
  attributeId?: string
  typeId?: string
  monsterInvocationId?: string
  monsterPrimaryTypesId?: string[]
  monsterSecondaryTypeId?: string
  monsterAbilitiesId?: string
  level?: number
  rank?: number
  link?: number
  attack_points?: string
  defense_points?: string
  pendulumEffect?: string
  pendulumScale?: number
  linkArrowsId?: string[]
  spellTypeId?: string
  trapTypeId?: string

  images?: FileList
}

export const CardForm = ({ card, fieldsData }: Props) => {
  // console.log({ card: card })
  const [message, setMessage] = useState('')
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { isValid },
    watch,
    getValues,
    setValue
  } = useForm<FormInputs>({
    defaultValues: {
      ...card,
      monsterPrimaryTypesId: card.monsterPrimaryTypesCard?.map(monsterPrimaryType => monsterPrimaryType.monsterPrimaryTypeId),
      linkArrowsId: card.LinkArrowsCard?.map(linkArrowCard => linkArrowCard.linkArrowsId),
      raritiesId: card.RarityCard?.map(rarityCard => rarityCard.rarityId),

      images: undefined
    }
  })

  const typeOfCardId = watch('typeOfCardId', '')
  // console.log({ typeOfCardId })

  const {
    typesOfCard, attributes, types, monsterInvocations, monsterPrimaryTypes,
    monsterSecondaryTypes, monsterAbilities, linkArrows, rarities,
    spellTypes, trapTypes
  } = fieldsData

  const selectedTypeOfCard = typesOfCard.filter(typeOfCard => (typeOfCard.id === typeOfCardId))[0]?.name
  // console.log({ selectedTypeOfCard })

  watch('raritiesId')

  const onRarityChange = (rarityField: string) => {
    const rarities = new Set(getValues('raritiesId'))
    console.log({ rarities })
    console.log({ rarityField })

    // if (!rarities.includes(rarityField)) {
    //   setValue('raritiesId', [...rarities, rarityField])
    // } else {
    //   const newRaritiesId = rarities.filter(rarity => rarity !== rarityField)
    //   setValue('raritiesId', newRaritiesId)
    // }

    rarities.has(rarityField) ? rarities.delete(rarityField) : rarities.add(rarityField)
    setValue('raritiesId', Array.from(rarities))
  }

  const onSubmit = async (data: FormInputs) => {
    // console.log({ data })
    const formData = new FormData()

    const { images, ...cardToSave } = data

    if (card.id) {
      formData.append('id', card.id ?? '')
    }

    // Commons fields
    formData.append('name', cardToSave.name)
    formData.append('password', cardToSave.password.toString())
    formData.append('slug', lodash.kebabCase(cardToSave.name))
    formData.append('cardText', cardToSave.cardText)
    formData.append('price', cardToSave.price.toString())
    formData.append('inStock', cardToSave.inStock.toString())
    formData.append('raritiesId', cardToSave.raritiesId.toString())
    formData.append('typeOfCardId', cardToSave.typeOfCardId)

    // console.log(images)
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    // Monster only fields
    formData.append('attributeId', cardToSave.attributeId ?? '')
    formData.append('typeId', cardToSave.typeId ?? '')
    formData.append('monsterInvocationId', cardToSave.monsterInvocationId ?? '')
    formData.append('monsterPrimaryTypesId', cardToSave.monsterPrimaryTypesId?.toString() ?? '')
    formData.append('monsterSecondaryTypeId', cardToSave.monsterSecondaryTypeId ?? '')
    formData.append('monsterAbilitiesId', cardToSave.monsterAbilitiesId ?? '')

    formData.append('level', cardToSave.level?.toString() ?? '')
    formData.append('rank', cardToSave.rank?.toString() ?? '')
    formData.append('link', cardToSave.link?.toString() ?? '')

    formData.append('attack_points', cardToSave.attack_points?.toString() ?? '')
    formData.append('defense_points', cardToSave.defense_points?.toString() ?? '')

    formData.append('pendulumEffect', cardToSave.pendulumEffect ?? '')
    formData.append('pendulumScale', cardToSave.pendulumScale?.toString() ?? '')

    formData.append('linkArrowsId', cardToSave.linkArrowsId?.toString() ?? '')

    // Spell only fields
    formData.append('spellTypeId', cardToSave.spellTypeId ?? '')

    // Trap only fields
    formData.append('trapTypeId', cardToSave.trapTypeId ?? '')

    const { ok, card: updatedCard, message } = await createUpdateCard(formData)

    if (!ok) {
      setMessage(message ?? '')
      return
    }

    router.replace(`/admin/card/${updatedCard?.slug}`)
  }

  return (
    <>
      {
        message && <p className="text-red-500">{message}</p>
      }
      <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
        <div className="w-full">
          <fieldset className="border-2 border-gray-300 rounded p-2">
            <legend>Obligatory fields</legend>
            <div className="flex flex-col mb-2">
              <span>Name</span>
              <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('name', { required: true })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Password</span>
              <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('password', { required: true })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Text</span>
              <textarea
                rows={5}
                className="p-2 border rounded-md bg-gray-200"
                {...register('cardText', { required: true })}
              ></textarea>
            </div>
            <div className="flex flex-col mb-2">
              <span>Price</span>
              <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
            </div>
            <div className="flex flex-col mb-2">
              <span>Type of Card</span>
              <select
                className="p-2 border rounded-md bg-gray-200"
                // onChange={(e) => { setTypeOfCard(e.target.selectedOptions[0].text) }}
                {...register('typeOfCardId', { required: true })}
              >
                <option value="">[Select]</option>
                {
                  typesOfCard.map(typeOfCard => (
                    <option key={typeOfCard.id} value={typeOfCard.id}>{typeOfCard.name}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col">
              <span>Rarity</span>
              <div className="flex flex-wrap">
                {
                  rarities.map(rarity => (
                    <div
                      key={rarity.id}
                      className={
                        clsx(
                          "flex items-center justify-center w-16 h-10 mr-2 cursor-pointer border rounded-md transition-all",
                          {
                            "bg-blue-500 text-white": getValues('raritiesId')?.includes(rarity.id)
                          }
                        )}
                      onClick={() => onRarityChange(rarity.id)}
                    >
                      <span>{rarity.name}</span>
                    </div>
                  ))
                }
              </div>
              <div className="flex flex-col mb-2">
                <span>Images</span>
                <input
                  type="file"
                  {...register('images')}
                  multiple
                  className="p-2 border rounded-md bg-gray-200"
                  accept="image/png, image/jpeg"
                />
              </div>
            </div>
            {
              card.id && card.cardImage?.length && 
              <div className="flex flex-col mb-2">
                <span>Principal image</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <CardImage
                      src={card.cardImage[0].name} width={300} height={300} alt={card.name ?? ''}
                      className="rounded-t-md shadow-md"
                    />
                    <button
                      type="button"
                      className="btn-danger w-full rounded-b-xl"
                      onClick={() => deleteCardImage(card.cardImage?.length ? card.cardImage[0].id : 0, card.cardImage?.length ? card.cardImage[0].name : '')}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            }
            {
              card.cardImage && card.cardImage?.length > 1
                ?
                <div className="flex flex-col mb-2">
                  <span>Extra images</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {
                      card.cardImage.slice(1).map(cardImage => (
                        <div key={cardImage.id}>
                          <CardImage
                            src={cardImage.name} width={300} height={300} alt={cardImage.name}
                            className="rounded-t-md shadow-md"
                          />
                          <button
                            type="button"
                            className="btn-danger w-full rounded-b-xl"
                            onClick={() => deleteCardImage(cardImage.id, cardImage.name)}
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    }
                  </div>
                </div>
                : <></>
            }
            <div className="flex flex-col mb-2">
              <span>Stock</span>
              <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('inStock', { required: true, min: 0 })} />
            </div>
          </fieldset>
          <button
            className="btn-primary w-full mt-1">
            Save
          </button>
        </div >
        <div className="w-full">
          {
            selectedTypeOfCard === 'Monster' &&
            <fieldset className="border-2 border-gray-300 rounded p-2">
              <legend>Monsters fields</legend>
              <div className="flex flex-col mb-2">
                <span>Attribute</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register('attributeId')}
                >
                  <option value="">[Select]</option>
                  {
                    attributes.map(attribute => (
                      <option key={attribute.id} value={attribute.id}>{attribute.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="flex flex-col mb-2">
                <span>Type</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register('typeId')}
                >
                  <option value="">[Select]</option>
                  {
                    types.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="flex flex-col mb-2">
                <span>Monster Invocation</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register('monsterInvocationId')}
                >
                  <option value="">[Select]</option>
                  {
                    monsterInvocations.map(monsterInvocation => (
                      <option key={monsterInvocation.id} value={monsterInvocation.id}>{monsterInvocation.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="flex flex-col mb-2">
                <span>Monster Primary Types(You can select more than one)</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  multiple
                  {...register('monsterPrimaryTypesId')}
                >
                  <option value="">[Select]</option>
                  {
                    // selected={card.monsterPrimaryTypes?.includes(monsterPrimaryType.name.toUpperCase() as MonsterPrimaryTypes)}
                    monsterPrimaryTypes.map(monsterPrimaryType => (
                      <option key={monsterPrimaryType.id} value={monsterPrimaryType.id}>{monsterPrimaryType.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="flex flex-col mb-2">
                <span>Monster Secondary Type</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register('monsterSecondaryTypeId')}
                >
                  <option value="">[Select]</option>
                  {
                    monsterSecondaryTypes.map(monsterSecondaryType => (
                      <option key={monsterSecondaryType.id} value={monsterSecondaryType.id}>{monsterSecondaryType.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="flex flex-col mb-2">
                <span>Monster Ability</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register('monsterAbilitiesId')}
                >
                  <option value="">[Select]</option>
                  {
                    monsterAbilities.map(monsterAbility => (
                      <option key={monsterAbility.id} value={monsterAbility.id}>{monsterAbility.name}</option>
                    ))
                  }
                </select>
              </div>
              <div className="h-[2px] w-full bg-gray-300 my-5" />
              <div className="flex flex-col mb-2">
                <span>Level</span>
                <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('level')} />
              </div>
              <div className="flex flex-col mb-2">
                <span>Rank</span>
                <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('rank')} />
              </div>
              <div className="flex flex-col mb-2">
                <span>Link</span>
                <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('link')} />
              </div>
              <div className="h-[2px] w-full bg-gray-300 my-5" />
              <div className="flex flex-col mb-2">
                <span>Attack Points</span>
                <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('attack_points')} />
              </div>
              <div className="flex flex-col mb-2">
                <span>Defense Points</span>
                <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('defense_points')} />
              </div>
              <div className="h-[2px] w-full bg-gray-300 my-5" />
              <div className="flex flex-col mb-2" {...register('pendulumEffect')}>
                <span>Pendulum effect</span>
                <textarea
                  rows={5}
                  className="p-2 border rounded-md bg-gray-200"
                ></textarea>
              </div>
              <div className="flex flex-col mb-2">
                <span>Pendulum scale</span>
                <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('pendulumScale')} />
              </div>
              <div className="h-[2px] w-full bg-gray-300 my-5" />
              <div className="flex flex-col mb-2">
                <span>Links Arrows(You can select more than one)</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  multiple
                  {...register('linkArrowsId')}
                >
                  <option value="">[Select]</option>
                  {
                    // selected={card.linkArrows?.includes(linkArrow.name as LinkArrows)}
                    linkArrows.map(linkArrow => (
                      <option key={linkArrow.id} value={linkArrow.id}>{linkArrow.name}</option>
                    ))
                  }
                </select>
              </div>
            </fieldset>
          }
          {
            selectedTypeOfCard === 'Spell' &&
            <fieldset className="border-2 border-gray-300 rounded p-2">
              <legend>Spell fields</legend>
              <div className="flex flex-col mb-2">
                <span>Spell Type</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register('spellTypeId')}
                >
                  <option value="">[Select]</option>
                  {
                    spellTypes.map(spellType => (
                      <option key={spellType.id} value={spellType.id}>{spellType.name}</option>
                    ))
                  }
                </select>
              </div>
            </fieldset>
          }
          {
            selectedTypeOfCard === 'Trap' &&
            <fieldset className="border-2 border-gray-300 rounded p-2">
              <legend>Trap fields</legend>
              <div className="flex flex-col mb-2">
                <span>Trap Type</span>
                <select
                  className="p-2 border rounded-md bg-gray-200"
                  {...register('trapTypeId')}
                >
                  <option value="">[Select]</option>
                  {
                    trapTypes.map(trapType => (
                      <option key={trapType.id} value={trapType.id}>{trapType.name}</option>
                    ))
                  }
                </select>
              </div>
            </fieldset>
          }
        </div>
      </form>
    </>
  );
};