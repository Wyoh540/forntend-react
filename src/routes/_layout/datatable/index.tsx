import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { getItems } from "@/client"
import { DataTable } from "./-components/data-table"
import { DataTablePagination } from "./-components/data-table-pagination"
import { columns } from "./-components/columns"
export const Route = createFileRoute("/_layout/datatable/")({
  component: RouteComponent,
})

function getItemsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: async () => await getItems({ query: { page: page, size: 10 } }),
    queryKey: ["items", { page }],
  }
}

function RouteComponent() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getItemsQueryOptions({ page: page }),
  })

  if (isLoading) {
    return <div>loading....</div>
  }
  // console.log(data)
  const items = data?.data?.items ?? []
  const total = data?.data?.total ?? 0
  const pages = data?.data?.pages ?? 0
  return (
    <div>
      <DataTable data={items} columns={columns}></DataTable>
      <DataTablePagination
        page={page}
        pageSize={size}
        total={total}
        pages={pages}
        onChange={(page, size) => {
          setPage(page)
          setSize(size)
        }}
      />
    </div>
  )
}
