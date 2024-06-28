import { startsWith } from "lodash"
import Image from "next/image"

interface Props {
  src?: string
  alt: string
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  width: number
  height: number
}

export const CardImage = ({ src, alt, className, width, height }: Props) => {
  const localSrc = src
    ? src.startsWith('http')
      ? src
      : `/img/cards/${src}`
    : '/img/placeholder.png'

  return (
    <Image src={localSrc} height={height} width={width} alt={alt} className={className} />
  )
}