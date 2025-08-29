import AuthenticatedLayout from "@/components/authenticated-layout"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = {
    name: "Usuário",
    email: "usuario@exemplo.com",
    role: "ADMIN",
  }
  return <AuthenticatedLayout user={user}>{children}</AuthenticatedLayout>
}


