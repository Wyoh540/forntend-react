import { type ColumnDef } from "@tanstack/react-table"
import { type ItemPublic } from "@/client"

export const columns: ColumnDef<ItemPublic>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "owner.full_name",
    header: "Owner",
  },
]
