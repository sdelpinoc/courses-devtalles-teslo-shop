import clsx from "clsx"
import { IoCartOutline } from "react-icons/io5"

interface Props {
  isPaid: Boolean
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div className={
      clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          'bg-green-700': isPaid,
          'bg-red-500': !isPaid,
        }
      )
    }>
      <IoCartOutline size={30} />
      {
        isPaid
          ? <span className="mx-2">Paid</span>
          : <span className="mx-2">Pending...</span>
      }
    </div>
  )
}
