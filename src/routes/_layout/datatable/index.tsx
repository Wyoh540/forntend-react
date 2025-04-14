import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

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

  const { data, isPending } = useQuery({
    ...getItemsOptions({
      query: { page: page, size: size, status: 1 },
    }),
    placeholderData: keepPreviousData,
  })

  return (
    <div className="flex flex-col gap-2">
      <div>
        <AddItem />
      </div>
      <DataTable
        data={data?.items || []}
        columns={columns}
        isPending={isPending}
      ></DataTable>
      <DataTablePagination
        page={page}
        pageSize={size}
        total={data?.total || 0}
        pages={data?.pages || 0}
        onChange={(page, pageSize) => {
          setPage(page)
          setSize(pageSize)
        }}
      />
    </div>
  )
}
