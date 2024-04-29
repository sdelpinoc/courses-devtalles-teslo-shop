'use client'

// import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
  quantity: number
  onQuantityChanged: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  // const [count, setCount] = useState(quantity)

  // const addQuantity = () => {
  //   if (count > 4) return count
  //   setCount(count => count + 1)
  // }

  // const removeQuantity = () => {
  //   if (count < 2) return count
  //   setCount(count => count - 1)
  // }

  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return

    onQuantityChanged(quantity + value)
  }

  return (
    <div className="flex">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline />
      </button>
      <span className="w-20 mx-3 px-5 bg-white text-center rounded">
        {quantity}
      </span>
      <button onClick={() => onValueChanged(1)}>
        <IoAddCircleOutline />
      </button>
    </div>
  )
}