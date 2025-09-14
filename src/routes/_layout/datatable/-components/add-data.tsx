import { useState } from "react"
import {
  useForm,
  type ControllerRenderProps,
  type SubmitHandler,
} from "react-hook-form"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { ItemStatus, type ItemCreate } from "@/client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { MultiSelect } from "@/components/multi-select"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  getItemTagsOptions,
  createItemMutation,
  getItemsQueryKey,
} from "@/client/@tanstack/react-query.gen"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Tag选择框
function TagSelect({
  field,
}: {
  field: ControllerRenderProps<ItemCreate, "tags">
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

const formSchema = z.object({
  title: z.string().min(2, { message: "Name must be at least 2 characters." }),
  status: z.nativeEnum(ItemStatus).optional(),
  tags: z.array(z.string()).optional(),
})

export function AddItem() {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const form = useForm<ItemCreate>({
    resolver: zodResolver(formSchema),
    defaultValues: { tags: [], status: 1 },
  })

  const mutation = useMutation({
    ...createItemMutation(),
    onSuccess: () => {
      // 成功后回调
      form.reset()
      setOpen(false)
      toast.success("请求成功")
    },
    onError: (err) => {
      // 失败后回调
      console.log(err)
    },
    onSettled: () => {
      // 执行完回调，使 items 数据无效，重新拉取
      queryClient.invalidateQueries({
        queryKey: getItemsQueryKey(),
      })
    },
  })

  const onSubmit: SubmitHandler<ItemCreate> = async (data) => {
    await mutation.mutateAsync({ body: data })
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
        <Button>新增</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增数据</DialogTitle>
          <DialogDescription>这个表单新增数据</DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标题</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>描述</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="description"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
