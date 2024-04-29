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
    <div>
      <Title title="Profile"/>
      <pre>
        {
          JSON.stringify(session.user, null, 2)
        }
      </pre>
      {/* <h3 className="text-2xl">{session.user.name}</h3>
      <h3 className="text-2xl">{session.user.role}</h3>
      <h3 className="text-2xl">{session.user.email}</h3> */}
    </div>
  )
}