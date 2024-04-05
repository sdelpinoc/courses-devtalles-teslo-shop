import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="#">
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
        <span>| Shop</span>
        <span>🎴 {new Date().getFullYear()}</span>
      </Link>
      <Link href="/" className="mx-3">
        Privacy & Legal
      </Link>
      <Link href="https://yugipedia.com/wiki/Yugipedia" target="_blank" className="mx-3">
        Yugipedia
      </Link>
      <Link href="https://ygoprodeck.com/" target="_blank" className="mx-3">
        Ygoprodeck.com
      </Link>
    </div >
  )
}