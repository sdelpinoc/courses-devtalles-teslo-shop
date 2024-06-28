'use server'

import prisma from "@/lib/prisma"

import { auth } from "@/auth.config"

interface PaginationOptions {
  page?: number
  take?: number
}

export const getPaginatedUsers = async ({page = 1, take = 3}: PaginationOptions) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'You must be an administrator user'
    }
  }

  const users = await prisma.user.findMany({
    take: take,
    skip: (page - 1) * take,
    orderBy: {
      name: 'desc'
    }
  })

  const totalUsers = await prisma.order.findMany({
    select: {
      id: true
    }
  })

  const totalPages = Math.ceil(totalUsers.length / take)

  return {
    ok: true,
    currentPage: page,
    totalPages: totalPages,
    users: users
  }
}