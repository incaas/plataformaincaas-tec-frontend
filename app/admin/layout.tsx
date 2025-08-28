import { requireMaster, getSession } from "@/lib/auth/session"
import AuthenticatedLayout from "@/components/authenticated-layout"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireMaster()
  const session = await getSession()
  const user = {
    name: (session?.claims as any)?.name as string | undefined,
    email: session?.claims?.email,
    role: session?.claims?.systemRole,
  }
  return <AuthenticatedLayout user={user}>{children}</AuthenticatedLayout>
}


