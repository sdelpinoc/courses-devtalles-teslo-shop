'use client'

import Link from "next/link"

import clsx from "clsx"

import { generatePagination } from "@/utils/generatePaginationNumbers"
import { usePathname, useSearchParams } from "next/navigation"

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? 1

  const currentPage = isNaN(+pageString) ? 1 : +pageString
  // console.log({ pathname, currentPage })

  const allPages = generatePagination(currentPage, totalPages)
  // console.log({ allPages })

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`
    }

    if (+pageNumber <= 0) {
      return `${pathname}?page=1`
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    params.set('page', pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="flex justify-center mt-4 mb-10">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-500 hover:bg-gray-200 focus:shadow-none" href={createPageUrl(currentPage - 1)}><IoChevronBackOutline size={30} /></Link>
          </li>
          {
            allPages?.map((page, index) => (
              <li key={page + '-' + index} className="page-item">
                <Link className={
                  clsx('page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 focus:shadow-none',
                    {
                      'bg-blue-600 shadow-md text-white hover:text-white hover:bg-blue-800': page === currentPage,
                      'hover:bg-gray-300': page !== currentPage
                    }
                  )
                }
                  href={createPageUrl(page)}>{page}</Link>
              </li>
            ))
          }
          <li className="page-item">
            <Link className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-500 hover:bg-gray-200 focus:shadow-none" href={createPageUrl(currentPage + 1)}><IoChevronForwardOutline size={30} /></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}