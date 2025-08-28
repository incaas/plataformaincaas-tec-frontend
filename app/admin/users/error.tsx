"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/custom/button"

export default function ErrorUsers({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertDescription>Não foi possível carregar a lista de usuários.</AlertDescription>
      </Alert>
      <Button onClick={reset}>Tentar novamente</Button>
      {error?.digest && <p className="text-xs text-muted-foreground">x-request-id: {error.digest}</p>}
    </div>
  )
}


