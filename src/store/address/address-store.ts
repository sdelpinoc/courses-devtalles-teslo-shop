import { Address } from "@/interfaces/address.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface State {
  address: Address
  getAddress: () => Address
  saveAddress: (address: Address) => void
}

export const useAddressStore = create<State>()(
  devtools( // -> To watch the store from the redux devtools
    persist(
      (set, get) => ({
        address: {
          firstName: '',
          lastName: '',
          address: '',
          address2: '',
          postalCode: '',
          city: '',
          country: '',
          phone: '',
        },
        getAddress () {
          const { address } = get()
          return address
        },
        saveAddress: (address: Address) => {
          set({
            address
          })
        }
      }),
      {
        name: 'address-store'
      }
    )
  )
)
