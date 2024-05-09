'use client'

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import clsx from "clsx"

import { useAddressStore } from "@/store/address/address-store"
import { useCartStore } from "@/store/cart/cart-store"

import { setUserAddress } from "@/actions/address/set-user-address"
import { deleteUserAddress } from "@/actions/address/delete-user-address"

import type { Address } from "@/interfaces/address.interface"
import type { Country } from "@/interfaces/country.interface"

type InputsForm = {
  firstName: string
  lastName: string
  address: string
  address2?: string
  postalCode: string
  city: string
  country: string
  phone: string
  rememberAddress: boolean
}

interface Props {
  countries: Country[],
  userStoreAddress?: Partial<Address> | null
}

export const AddressForm = ({ countries, userStoreAddress = {} }: Props) => {
  const saveAddress = useAddressStore(state => state.saveAddress)
  const address = useAddressStore(state => state.address)
  const totalItemsInCart = useCartStore(state => state.getTotalItems())

  const { data: session } = useSession({
    required: true
  })

  const { handleSubmit, register, formState: { isValid }, reset } = useForm<InputsForm>({
    defaultValues: {
      ...userStoreAddress,
      rememberAddress: false
    }
  })

  const router = useRouter()

  const onSubmit = async (data: InputsForm) => {
    console.log({ data })

    const { rememberAddress, ...addressForm } = data

    saveAddress(addressForm) // -> Zustand

    if (rememberAddress) {
      // At this point we know that we will always have the user id
      await setUserAddress(addressForm, session!.user.id)
    } else {
      await deleteUserAddress(session!.user.id)
    }

    router.push('/checkout')
  }

  useEffect(() => {
    if (totalItemsInCart === 0) {
      router.replace('/empty')
      return
    }

    if (address.firstName) {
      reset(address)
    }
  }, [address, reset, router, totalItemsInCart])

  if (totalItemsInCart === 0) {
    return <p>Loading...</p>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
      <div className="flex flex-col mb-2">
        <span>Name</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200" {...register('firstName', { required: true })}
        />
      </div>
      <div className="flex flex-col mb-2">
        <span>Last name</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200" {...register('lastName', { required: true })}
        />
      </div>
      <div className="flex flex-col mb-2">
        <span>Address</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200" {...register('address', { required: true })}
        />
      </div>
      <div className="flex flex-col mb-2">
        <span>Address 2 (optional)</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200" {...register('address2')}
        />
      </div>
      <div className="flex flex-col mb-2">
        <span>Postal Code</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200" {...register('postalCode', { required: true })}
        />
      </div>
      <div className="flex flex-col mb-2">
        <span>City</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200" {...register('city', { required: true })}
        />
      </div>
      <div className="flex flex-col mb-2">
        <span>Country</span>
        <select
          className="p-2 border rounded-md bg-gray-200" {...register('country', { required: true })}
        >
          <option value="">[ Select ]</option>
          {
            countries?.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))
          }
        </select>
      </div>
      <div className="flex flex-col mb-2">
        <span>Phone number</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200" {...register('phone', { required: true })}
        />
      </div>
      <div className="flex flex-col mb-2 sm:mt-1">
        <div className="inline-flex items-center mb-10">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register('rememberAddress')}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>Remember address?</span>
        </div>
        <button
          // href='/checkout'
          disabled={!isValid}
          type="submit"
          className={clsx("btn-primary flex w-full sm:w-1/2 justify-center", {
            "btn-primary": isValid,
            "btn-disabled": !isValid
          })}>
          Continue
        </button>
      </div>
    </form>
  )
}