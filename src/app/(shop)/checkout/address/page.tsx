import { Title } from "@/components/ui/title/Title";
import { AddressForm } from "./ui/AddressForm";
import { getCountries } from "@/actions/countries/get-countries";
import { getUserAddress } from "@/actions/address/get-user-address";
import { auth } from "@/auth.config";

export default async function AddressPage () {
  const countries = await getCountries()

  const session = await auth()
  if (!session?.user) {
    return <h3 className="text-5xl">500 - User session not exist</h3>
  }

  const address = await getUserAddress(session.user.id)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-52 px-10 sm:px-0">
      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery Address" />
        <AddressForm countries={countries} userStoreAddress={address} />
      </div>
    </div>
  )
}