import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DevsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Desenvolvedores</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipe de Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta funcionalidade estará disponível na próxima versão.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
