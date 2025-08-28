import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = { searchParams: { reason?: string; remaining?: string } }

export default async function BlockedPage({ searchParams }: Props) {
  const reasonKey = searchParams?.reason
  const remaining = searchParams?.remaining
  const reason = reasonKey === 'rate_limit'
    ? 'Muitas tentativas. Tente novamente mais tarde.'
    : reasonKey === 'unauthorized'
    ? 'Credenciais inválidas ou conta bloqueada.'
    : 'Acesso temporariamente bloqueado'
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Conta bloqueada</CardTitle>
          <CardDescription className="text-center">{reason}</CardDescription>
        </CardHeader>
        <CardContent>
          {remaining && (
            <p className="text-center text-sm text-muted-foreground">Tempo restante: {remaining}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


