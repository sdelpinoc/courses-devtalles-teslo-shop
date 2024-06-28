'use server'

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteCardImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      message: 'Can\'t delete images from file system'
    }
  }

  const imageName = imageUrl.split('/').at(-1)?.split('.')[0] ?? ''
  // console.log({ imageName })

  try {
    await cloudinary.uploader.destroy(`teslo-shop/${imageName}`)

    const deletedImage = await prisma.cardImage.delete({
      where: {
        id: imageId
      },
      select: {
        card: {
          select: {
            slug: true
          }
        }
      }
    })

    // Revalidate paths
    revalidatePath(`/admin/cards`)
    revalidatePath(`/admin/card/${deletedImage.card.slug}`)
    revalidatePath(`/card /${deletedImage.card.slug}`)

    return {
      ok: true,
      message: 'Image deleted successfully'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Could not delete image'
    }
  }
}