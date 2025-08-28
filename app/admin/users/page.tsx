import { requireMaster, attachAuthHeader } from "@/lib/auth/session"
import { serverFetchJSON } from "@/lib/server-fetch"
import type { PaginatedResponse, User, UsersListParams } from "@/lib/types/users"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/custom/input"
import { Button } from "@/components/custom/button"
import Link from "next/link"
import { UserFormDialog } from "@/components/admin/users/user-form-dialog"
import { DeleteUserDialog } from "@/components/admin/users/delete-user-dialog"
import { PaginationControls } from "@/components/custom/pagination"
import { DataTable } from "@/components/custom/table"

export const dynamic = 'force-dynamic'

export default async function UsersPage({ searchParams }: { searchParams: UsersListParams }) {
  await requireMaster()
  const resp = await serverFetchJSON<PaginatedResponse<User>>({
    pathname: '/admin/users',
    method: 'GET',
    headers: { ...(await attachAuthHeader()) },
    searchParams: {
      q: searchParams?.q,
      page: searchParams?.page ?? 1,
      pageSize: searchParams?.pageSize ?? 10,
      sortBy: searchParams?.sortBy ?? 'createdAt',
      sortDir: searchParams?.sortDir ?? 'desc'
    }
  })
  const data = resp.data ?? { items: [], total: 0, page: 1, pageSize: 10 }
  const buildHref = (p: number) => {
    const sp = new URLSearchParams()
    if (searchParams?.q) sp.set('q', String(searchParams.q))
    sp.set('page', String(p))
    sp.set('pageSize', String(data.pageSize))
    return `/admin/users?${sp.toString()}`
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Usuários</CardTitle>
          <UserFormDialog mode="create" trigger={<Button>Novo usuário</Button>} />
        </CardHeader>
        <CardContent>
          <form className="flex gap-2">
            <Input name="q" placeholder="Buscar por nome ou email" defaultValue={searchParams?.q as string | undefined} />
            <Button type="submit">Filtrar</Button>
          </form>
          <div className="mt-4">
            <DataTable
              columns={[
                { key: 'name', header: 'Nome' },
                { key: 'email', header: 'Email' },
                { key: 'systemRole', header: 'Perfil' },
                { key: 'status', header: 'Status', render: (u) => (
                  <div className="flex items-center gap-2">
                    <span>{u.status}</span>
                    <UserFormDialog mode="edit" defaultValues={{ id: u.id, name: u.name, email: u.email, systemRole: u.systemRole, status: u.status }} trigger={<Button variant="secondary" size="sm">Editar</Button>} />
                    <DeleteUserDialog userId={u.id} trigger={<Button variant="destructive" size="sm">Excluir</Button>} />
                  </div>
                ) }
              ]}
              rows={data.items}
              rowKey={(u) => u.id}
              emptyMessage="Nenhum usuário encontrado"
            />
          </div>
        </CardContent>
      </Card>
      <PaginationControls page={data.page} pageSize={data.pageSize} total={data.total} buildHref={buildHref} />
    </div>
  )
}


