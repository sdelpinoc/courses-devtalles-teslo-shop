import { redirect } from "next/navigation"

import { Title } from "@/components/ui/title/Title"

import { getCardBySlug } from "@/actions/card/get-card-by-slug"
import { getFields } from "@/actions/card/get-fields"

import { CardForm } from "./ui/CardForm"

interface Props {
  params: {
    slug: string
  }
}

export default async function CardPage ({ params }: Props) {
  const { slug } = params

  // const card = await getCardBySlug(slug)
  // const { fieldsForm } = await getFields()

  const [card, fields] = await Promise.all([getCardBySlug(slug), getFields()])
  // console.log({ card })

  const { fieldsData } = fields
  
  // TODO: New
  if ((!card && slug !== 'new') || !fieldsData) {
    redirect('/admin/cards')
  }

  const title = slug === 'new' ? 'New card' : 'Edit card'

  return (
    <>
      <Title title={title} />
      <CardForm card={card ?? {}} fieldsData={fieldsData} />
    </>
  )
}
