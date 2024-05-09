// [1, 2, 3, 4, 5, ..., 50]
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of page is 7 o less, we show all of them
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is between the first three, show them, then suspensive dots and then the last 2 pages
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is between the last three, show the first 2, then suspensive dots and finally show the last 3 pages
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // if the current page, is in the middle, we show the first page, suspensive dots, current page and the next/previous ones, and finally the last one
  if (currentPage > 3 && currentPage < totalPages - 2) {
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }
}