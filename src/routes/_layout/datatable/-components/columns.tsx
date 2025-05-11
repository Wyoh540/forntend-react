import { type ColumnDef } from "@tanstack/react-table"
import { type ItemPublic, type StatusEnum } from "@/client"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// 状态Badge 组件
function StatusBadge({ status }: { status: StatusEnum }) {
  const statusMap: Record<StatusEnum, { label: string; className: string }> = {
    1: {
      label: "在线",
      className: "bg-green-100 text-green-800",
    },
    2: {
      label: "离线",
      className: "bg-red-100 text-red-800",
    },
  }
  return (
    <Badge variant="outline" className={statusMap[status].className}>
      {statusMap[status].label}
    </Badge>
  )
}

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
    header: "status",
    accessorKey: "status",
    cell: ({ row }) => {
      return <StatusBadge status={row.getValue("status")} />
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.original.tags
      return (
        <div className="flex flex-row gap-1">
          {tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))}
        </div>
      )
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
