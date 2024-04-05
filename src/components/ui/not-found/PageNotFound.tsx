import { titleFont } from "@/config/fonts"
import Image from "next/image"
import Link from "next/link"

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>
          404
        </h2>
        <p className="font-semibold">Whoops!, the content you were looking for is not available.</p>
        <p className="font-light">
          <span>You can return to the </span>
          <Link href="/" className="font-normal hover:underline transition-all">Home Page</Link>
        </p>
        <div className="flex justify-center px-5 mx-5">
          <Image
            className="rounded-full p-4 sm:p-2"
            src="/img/yu-gi-oh-anime-card.webp"
            alt="Missing page image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
          />
        </div>
      </div>
    </div>
  )
}