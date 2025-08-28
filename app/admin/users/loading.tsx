import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingUsers() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Usuários</CardTitle>
          <Skeleton className="h-9 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="mt-4 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


