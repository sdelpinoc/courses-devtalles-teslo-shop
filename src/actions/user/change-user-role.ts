'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// type Role = 'admin' | 'user'

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'You must be an administrator user'
    }
  }

  try {

    const newRole = role === 'admin' ? 'admin' : 'user'

    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    })

    revalidatePath('/admin/users')

    return {
      ok: true
    }

  } catch (error) {
    console.log({ error })

    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = 'Could not update role'
    }

    return {
      ok: false,
      message
    }
  }
}