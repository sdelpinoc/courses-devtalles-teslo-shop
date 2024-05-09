'use client'

import { PayPalButtons, usePayPalScriptReducer, } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { setTransactionId } from "@/actions/payments/set-transaction-id"
import { paypalCheckPayment } from "@/actions/payments/paypal-check-payment"

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = (Math.round(amount * 100)) / 100

  if (isPending) {
    return (
      <div className="animate-pulse flex flex-col gap-4">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded" />
      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [{
        invoice_id: orderId,
        amount: {
          currency_code: 'USD',
          value: `${roundedAmount}`,
        }
      }]
    })
    // console.log({ transactionId })

    // Save the transactionId in the order
    const response = await setTransactionId(orderId, transactionId)

    if (!response.ok) throw new Error(response.message)

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
    // console.log('onApprove')
    const details = await actions.order?.capture()

    if (!details?.id) return

    await paypalCheckPayment(details.id) // details.id === transaction-id
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
    />
  )
}