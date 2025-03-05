import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { getItemsOptions } from "@/client/@tanstack/react-query.gen"
import { DataTable } from "./-components/data-table"
import { DataTablePagination } from "./-components/data-table-pagination"
import { columns } from "./-components/columns"
import { AddItem } from "./-components/add-data"

export const Route = createFileRoute("/_layout/datatable/")({
  component: RouteComponent,
})

function RouteComponent() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  const { data, isLoading } = useQuery({
    ...getItemsOptions({
      query: { page: page, size: size },
    }),
  })

  if (isLoading) {
    return <div>loading....</div>
  }
  // console.log(data)
  const items = data?.items ?? []
  const total = data?.total ?? 0
  const pages = data?.pages ?? 0

  const onChange = (page: number, pageSize: number) => {
    setPage(page)
    setSize(pageSize)
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <AddItem />
      </div>
      <DataTable data={items} columns={columns}></DataTable>
      <DataTablePagination
        page={page}
        pageSize={size}
        total={total}
        pages={pages}
        onChange={onChange}
      />
    </div>
  )
}
