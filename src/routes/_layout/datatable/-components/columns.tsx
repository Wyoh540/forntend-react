import { type ColumnDef } from "@tanstack/react-table"
import { type ItemPublic } from "@/client"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  deleteItemMutation,
  getItemsQueryKey,
} from "@/client/@tanstack/react-query.gen"
import { EditItem } from "./edit-data"
import { toast } from "sonner"

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
    cell: ({ row }) => {
      const tags = row.original.tags
      return tags.map((tag, index) => (
        <Badge key={index} variant="outline">
          {tag}
        </Badge>
      ))
    },
  },
  {
    accessorKey: "owner.full_name",
    header: "Owner",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original

      const queryclient = useQueryClient()

      const mutation = useMutation({
        ...deleteItemMutation(),
        onSuccess: () => {
          toast.success("删除成功")
        },
        onError: (err) => {
          toast.error("删除失败")
          console.log(err)
        },
        onSettled: () => {
          queryclient.invalidateQueries({ queryKey: getItemsQueryKey() })
        },
      })

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <EditItem item={item} />
            <DropdownMenuItem
              onClick={async () =>
                await mutation.mutateAsync({ path: { item_id: item.id } })
              }
            >
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
