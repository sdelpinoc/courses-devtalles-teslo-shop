'use client'
import { titleFont } from "@/config/fonts"
import { useUIStore } from "@/store/ui/ui-store"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
  const openMenu = useUIStore(state => state.openSideMenu)

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
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gradient-to-r from-monster-normal to-monster-effect" href="/category/monster">
          Monsters
        </Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-spell" href="/category/spell">
          Spells
        </Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-trap" href="/category/trap">
          Trap
        </Link>
        {/* <Link className="m-2 p-2 rounded-md transition-all hover:bg-character" href="/category/characters">
          Characters
        </Link> */}
      </div>
      {/* Search, Cart, Menu */}
      <div className="flex items-center gap-3 mt-2">
        <Link href="/search">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart">
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-golden-yugioh text-white">3</span>
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