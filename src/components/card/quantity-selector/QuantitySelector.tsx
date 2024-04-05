'use client'

import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity)

  // const addQuantity = () => {
  //   if (count > 4) return count
  //   setCount(count => count + 1)
  // }

  // const removeQuantity = () => {
  //   if (count < 2) return count
  //   setCount(count => count - 1)
  // }

  const onChangeQuantity = (value: number) => {
    if (count + value < 1) return

    setCount(count + value)
  }

  return (
    <div className="flex">
      <button onClick={() => onChangeQuantity(-1)}>
        <IoRemoveCircleOutline />
      </button>
      <span className="w-20 mx-3 px-5 bg-white text-center rounded">
        {count}
      </span>
      <button onClick={() => onChangeQuantity(1)}>
        <IoAddCircleOutline />
      </button>
    </div>
  )
}