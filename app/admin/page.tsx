import { requireMaster } from "@/lib/auth/session"

export default async function AdminDashboardPage() {
  await requireMaster()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Bem-vindo ao Gateway de Autenticação.</p>
    </div>
  )
}


