import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ResponsePagniation({page, maxPage, setPage}: {page: number, maxPage: number, setPage: (page: number | (() => number)) => void}) {

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage(() => Math.max(0, page - 1))} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{page === 0 ? 1 : page} / {maxPage === 0 ? 1 : maxPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => setPage(() => Math.min(maxPage, page + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>)
}
