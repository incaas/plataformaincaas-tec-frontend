import { cn } from "@/lib/utils"

type Column<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}

type Props<T> = {
  columns: Column<T>[]
  rows: T[]
  emptyMessage?: string
  rowKey: (row: T) => string
}

export function DataTable<T>({ columns, rows, emptyMessage = 'Sem dados', rowKey }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            {columns.map(col => (
              <th key={String(col.key)} className={cn("py-2", col.className)}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={rowKey(row)} className="border-t">
              {columns.map(col => (
                <td key={String(col.key)} className={cn("py-2", col.className)}>
                  {col.render ? col.render(row) : (row as any)[col.key as any]}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td className="py-6 text-center text-muted-foreground" colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


