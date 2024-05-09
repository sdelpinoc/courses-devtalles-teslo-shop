'use server'

import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"

import { PayPalOrderStatusResponse } from "@/interfaces/paypal.interface"

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  // console.log({ paypalTransactionId })

  const authToken = await getPayPalBearerToken()
  // console.log({ authToken })

  if (!authToken) {
    return {
      ok: false,
      message: 'Could not get verification token'
    }
  }

  const response = await verifyPayPalPayment(paypalTransactionId, authToken)

  if (!response) {
    return {
      ok: false,
      message: 'Error verifying payment'
    }
  }

  const { status, purchase_units } = response
  const { invoice_id: orderId } = purchase_units[0]
  // console.log({ status, purchase_units })

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Payment has not yet been made in Paypal'
    }
  }

  try {
    await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true
    }
  } catch (error) {
    console.log({ error })
    return {
      ok: false,
      message: 'Payment could not be made'
    }
  }
}

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64')

  const headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Authorization": `Basic ${base64Token}`,
    "Content-Type": "application/x-www-form-urlencoded"
  }

  const bodyContent = "grant_type=client_credentials";

  try {
    const response = await fetch(PAYPAL_OAUTH_URL, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      cache: 'no-store'
    });

    const data = await response.json();
    // console.log(data);

    return data.access_token
  } catch (error) {
    console.log({ error })
    return null
  }
}

const verifyPayPalPayment = async (
  paypalTransactionIdId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrdersUrl = process.env.PAYPAL_ORDERS_URL

  const headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Authorization": `Bearer ${bearerToken}`
  }

  try {
    const response = await fetch(paypalOrdersUrl + '/' + `${paypalTransactionIdId}`, {
      method: "GET",
      headers: headersList,
      cache: 'no-store'
    });

    const data = await response.json();
    // console.log({ data });

    return data
  } catch (error) {
    console.log({ error })
    return null
  }
}