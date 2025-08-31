import AuthenticatedLayout from "@/components/authenticated-layout"

export default function ProjetosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mock user data - em produção isso viria de autenticação real
  const mockUser = {
    name: "Vynicius Martorano",
    email: "vynicius.martorano@incaas.com",
    role: "MASTER"
  }

  return (
    <AuthenticatedLayout user={mockUser}>
      {children}
    </AuthenticatedLayout>
  )
}
