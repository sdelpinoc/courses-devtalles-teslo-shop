'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"

import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

import { titleFont } from "@/config/fonts"
import { useUIStore } from "@/store/ui/ui-store"
import clsx from "clsx"
import { useCartStore } from "@/store/cart/cart-store"
import { useEffect, useState } from "react"

export const TopMenu = () => {
  const pathname = usePathname()
  const openMenu = useUIStore(state => state.openSideMenu)
  const totalItemsInCart = useCartStore(state => state.getTotalItems())

  const [loaded, setLoaded] = useState(false)

  // The use of the state and effect hooks, is for correct the hydrations errors
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div className="mt-2">
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* Center menu */}
      <div className="hidden sm:block mt-2">
        <Link className={clsx('m-2 p-2 rounded-md transition-all hover:bg-gradient-to-r from-monster-normal to-monster-effect',
          {
            'border-b-2 border-b-monster-effect': pathname.includes('monster')
          })} href="/typeOfCard/monster">
          Monsters
        </Link>
        <Link className={clsx('m-2 p-2 rounded-md transition-all hover:bg-spell',
          {
            'border-b-2 border-b-spell': pathname.includes('spell')
          })} href="/typeOfCard/spell">
          Spells
        </Link>
        <Link className={clsx('m-2 p-2 rounded-md transition-all hover:bg-trap', {
          'border-b-2 border-b-trap': pathname.includes('trap')
        })} href="/typeOfCard/trap">
          Traps
        </Link>
        {/* <Link className="m-2 p-2 rounded-md transition-all hover:bg-character" href="/category/characters">
          Characters
        </Link> */}
      </div>
      {/* Search, Cart, Menu */}
      <div className="flex items-center gap-3 mt-2">
        {/* <Link href="/search">
          <IoSearchOutline className="w-5 h-5" />
        </Link> */}
        <Link href={(loaded && totalItemsInCart > 0) ? '/cart' : '/empty'}>
          <div className="relative">
            {
              loaded && (totalItemsInCart > 0) && (
                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-golden-yugioh text-white">{totalItemsInCart}</span>
              )
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button onClick={openMenu} className="p-2 rounded-md transition-all hover:bg-gray-200">
          Menu
        </button>
      </div>
    </nav>
  )
}