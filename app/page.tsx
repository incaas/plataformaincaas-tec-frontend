import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"

export default async function IndexPage() {
  const session = await getSession()
  if (session?.claims?.systemRole === 'MASTER') redirect('/admin')
  redirect('/login')
}