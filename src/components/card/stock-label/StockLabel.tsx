'use client'

import { getStockBySlug } from "@/actions/card/get-stock-by-slug"
import { useEffect, useState } from "react"

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStock()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getStock = async () => {
    const stock = await getStockBySlug(slug)
    console.log({ stock })

    setStock(stock)
    setIsLoading(false)
  }

  return (
    <>
      <h3 className="font-bold mt-2">Stock:</h3>
      {
        isLoading ?
          (
            <p className="text-lg mb-5 animate-pulse bg-gray-200 w-10 rounded">
              &nbsp;
            </p>

          ) : (
            <p className="text-lg mb-5">
              {stock}
            </p>
          )
      }
    </>
  )
}