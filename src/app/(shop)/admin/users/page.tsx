import { redirect } from "next/navigation"

import { auth } from "@/auth.config"
import { getPaginationOrders } from "@/actions/order/get-pagination-orders"
import { Pagination } from "@/components/ui/pagination/Pagination"
import { Title } from "@/components/ui/title/Title"
import { UsersTable } from "./ui/UsersTable"
import { getPaginatedUsers } from "@/actions/user/get-paginated-users"

interface Props {
  searchParams: {
    page: string
  }
}

export default async function UsersPage ({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  const { ok, message, users = [], totalPages = 1 } = await getPaginatedUsers({ page, take: 3 })

  if (!ok) {
    return <p>{message}</p>
  }

  return (
    <>
      <Title title="All Users" />
      <div className="mb-10">
        <UsersTable users={users} />
      </div>
      {
        totalPages > 1 ? <Pagination totalPages={totalPages} /> : ''
      }
    </>
  )
}
