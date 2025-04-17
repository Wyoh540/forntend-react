import { useState } from "react"
import { toast } from "sonner"
import {
  useForm,
  type ControllerRenderProps,
  type SubmitHandler,
} from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { type ItemPublic, type ItemUpdate } from "@/client"
import {
  getItemTagsOptions,
  updateItemMutation,
  getItemsQueryKey,
} from "@/client/@tanstack/react-query.gen"
import { MultiSelect } from "@/components/multi-select"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function TagSelect({
  field,
}: {
  field: ControllerRenderProps<ItemUpdate, "tags">
}) {
  const { data: tags } = useQuery({ ...getItemTagsOptions() })

  const tagList =
    tags?.map((tag) => ({ value: tag.name, label: tag.name })) || []

  return (
    <MultiSelect
      options={tagList}
      onValueChange={field.onChange}
      defaultValue={field.value}
      placeholder="Select options"
      variant="inverted"
      maxCount={3}
    />
  )
}

export function EditItem({ item }: { item: ItemPublic }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const form = useForm<ItemUpdate>({
    values: item,
  })

  const mutation = useMutation({
    ...updateItemMutation(),
    onSuccess: () => {
      form.reset()
      setOpen(false)
      toast.success("修改成功")
    },
    onError: (err) => {
      console.log(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getItemsQueryKey() })
    },
  })

  const onSubmit: SubmitHandler<ItemUpdate> = async (data) => {
    await mutation.mutateAsync({ body: data, path: { item_id: item.id } })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
        >
          编辑
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>编辑</DialogTitle>
        <DialogDescription>编辑数据</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="title"
                      {...field}
                      value={item.title || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(Number(value))
                    }}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">在线</SelectItem>
                      <SelectItem value="2">离线</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标签</FormLabel>
                  <FormControl>
                    <TagSelect field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="default"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin" />
                )}
                保存
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
