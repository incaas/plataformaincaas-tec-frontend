import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clientes</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestão de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Sistema de gestão de clientes em desenvolvimento.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
