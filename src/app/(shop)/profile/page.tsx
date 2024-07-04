import { auth } from "@/auth.config";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

export default async function ProfilePage () {
  const session = await auth()

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect('/')
  }

  return (
    <div className="mb-10">
      <Title title="Profile"/>
      <h3 className="text-xl">Name: {session.user.name}</h3>
      <h3 className="text-xl">Role: {session.user.role}</h3>
      <h3 className="text-xl">Email: {session.user.email}</h3>
    </div>
  )
}