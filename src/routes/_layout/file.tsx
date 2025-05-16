import {
  createFile,
  createFileWithForm,
  downloadFile,
  type BodyCreateFileWithForm,
  type UploadFile,
} from "@/client"
import {
  createFileWithFormMutation,
  getUploadFilesOptions,
} from "@/client/@tanstack/react-query.gen"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import type { ColumnDef } from "@tanstack/react-table"
import { CloudUpload, Upload, X } from "lucide-react"
import { useCallback, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const Route = createFileRoute("/_layout/file")({
  component: RouteComponent,
  staticData: {
    breadcrumb: {
      title: "文件上传",
      display: true,
    },
  },
})

// 文件直接上传
function FileUploadDirectUploadDemo() {
  const [files, setFiles] = useState<File[]>([])
  const onUpload = useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void
        onSuccess: (file: File) => void
        onError: (file: File, error: Error) => void
      },
    ) => {
      try {
        // Process each file individually
        const uploadPromises = files.map(async (file) => {
          try {
            const xhr = new XMLHttpRequest()
            xhr.upload.onprogress = (event) => {
              const progress = (event.loaded / event.total) * 100
              onProgress(file, progress)
            }

            await createFile({
              body: {
                file: file,
              },
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            onSuccess(file)
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            )
          }
        })

        // Wait for all uploads to complete
        await Promise.all(uploadPromises)
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
        console.error("Unexpected error during upload:", error)
      }
    },
    [],
  )

  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    })
  }, [])

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onUpload={onUpload}
      onFileReject={onFileReject}
      maxFiles={2}
      className="w-full max-w-md"
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="text-muted-foreground size-6" />
          </div>
          <p className="text-sm font-medium">Drag & drop files here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max 2 files)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  )
}

const formSchema = z.object({
  file: z
    .array(z.custom<File>())
    .nonempty()
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["file"],
    }),
  fileb: z.array(z.custom<File>()),
  token: z.string(),
})

// 表单文件上传
function FileUploadWithForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: [],
      fileb: [],
    },
  })

  // 文件上传
  const uploadFile = async (formData: z.infer<typeof formSchema>) => {
    const { error } = await createFileWithForm({
      body: {
        file: formData.file[0],
        fileb: formData.fileb[0],
        token: formData.token,
      },
    })
    if (error) {
      toast.error("上传失败")
      return
    }

    toast.success("上传成功")
  }
  // 表单提交
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    await uploadFile(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>必选文件file</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onValueChange={field.onChange}
                  accept="image/*"
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
                  onFileReject={(_, message) => {
                    form.setError("file", {
                      message,
                    })
                  }}
                >
                  <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-fit">
                      Browse files
                    </Button>
                  </FileUploadTrigger>
                  <FileUploadList>
                    {field.value.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <X />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormDescription>选择小于5M的图片</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>可选文件fileb</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onValueChange={field.onChange}
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
                  onFileReject={(_, message) => {
                    form.setError("file", {
                      message,
                    })
                  }}
                >
                  <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-fit">
                      Browse files
                    </Button>
                  </FileUploadTrigger>
                  <FileUploadList>
                    {field.value.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <X />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

const columns: ColumnDef<UploadFile>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "filename",
    header: "文件名称",
  },
  {
    accessorKey: "filepath",
    header: "文件路径",
  },
  {
    accessorKey: "file_size",
    header: "文件大小",
  },
  {
    accessorKey: "content_type",
    header: "文件类型",
  },
  {
    header: "操作",
    cell: ({ row }) => {
      const file = row.original

      return (
        <div>
          <Button
            onClick={async () => {
              try {
                // 调用 downloadFile 方法获取文件的 Blob 对象
                const response = await downloadFile({
                  path: {
                    file_id: file.id,
                  },
                  responseType: "blob",
                })
                console.log(response)
                // 检查响应是否包含 Blob 对象
                if (response && response.data instanceof Blob) {
                  // 创建一个临时的 URL 指向 Blob 对象
                  const url = window.URL.createObjectURL(response.data)
                  // 创建一个 a 标签
                  const a = document.createElement("a")
                  a.href = url
                  // 设置下载的文件名，这里假设文件名可以从 file 对象获取
                  a.download = file.filename
                  // 将 a 标签添加到文档中
                  document.body.appendChild(a)
                  // 模拟点击 a 标签触发下载
                  a.click()
                  // 移除 a 标签
                  document.body.removeChild(a)
                  // 释放临时 URL
                  window.URL.revokeObjectURL(url)
                }
              } catch (error) {
                console.error("文件下载失败", error)
              }
            }}
          >
            下载
          </Button>
        </div>
      )
    },
  },
]

function RouteComponent() {
  const { data, isPending } = useQuery({
    ...getUploadFilesOptions(),
    placeholderData: keepPreviousData,
  })

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>直接上传</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploadDirectUploadDemo />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>表单上传</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploadWithForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>文件列表</CardTitle>
          <CardDescription>已上传文件列表</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data?.items || []}
            columns={columns}
            isPending={isPending}
          />
        </CardContent>
      </Card>
    </div>
  )
}
