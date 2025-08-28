import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

type Props = {
  page: number
  pageSize: number
  total: number
  buildHref: (page: number) => string
}

export const PaginationControls = ({ page, pageSize, total, buildHref }: Props) => {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)))
  const hasPrev = page > 1
  const hasNext = page < totalPages
  const pages: number[] = []
  const start = Math.max(1, page - 1)
  const end = Math.min(totalPages, page + 1)
  for (let p = start; p <= end; p++) pages.push(p)

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={hasPrev ? buildHref(page - 1) : undefined} aria-disabled={!hasPrev} className={!hasPrev ? 'pointer-events-none opacity-50' : ''} />
        </PaginationItem>
        {pages.map(p => (
          <PaginationItem key={p}>
            <PaginationLink href={buildHref(p)} isActive={p === page}>{p}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={hasNext ? buildHref(page + 1) : undefined} aria-disabled={!hasNext} className={!hasNext ? 'pointer-events-none opacity-50' : ''} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}


