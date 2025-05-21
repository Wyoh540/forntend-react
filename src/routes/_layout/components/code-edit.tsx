import * as monaco from "monaco-editor"
import { MonacoEditor } from "@/components/monaco-editor"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import type { Monaco } from "@monaco-editor/react"
import { Label } from "@/components/ui/label"

export const Route = createFileRoute("/_layout/components/code-edit")({
  component: RouteComponent,
  staticData: {
    breadcrumb: {
      title: "代码编辑器",
      display: true,
    },
  },
})

function RouteComponent() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [code, setCode] = useState(
    '// Write your code here\nconsole.log("Hello, world!");',
  )
  const [language, setLanguage] = useState("javascript")
  const [theme, setTheme] = useState("vs")

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor
  }

  function handleShowValue() {
    console.log(editorRef.current?.getValue())
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <Label htmlFor="language">语言:</Label>
            <SelectValue id="language" placeholder="请选择语言" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">javascript</SelectItem>
            <SelectItem value="python">python</SelectItem>
          </SelectContent>
        </Select>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-[150px]">
            <Label htmlFor="theme">主题:</Label>
            <SelectValue id="theme" placeholder="请选择编辑器主题" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vs">vs</SelectItem>
            <SelectItem value="vs-dark">vs-dark</SelectItem>
            <SelectItem value="hc-black">hc-black</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleShowValue}>获取值</Button>
      </div>

      <MonacoEditor
        value={code}
        theme={theme}
        language={language}
        onMount={handleEditorDidMount}
        onChange={setCode}
      />
    </div>
  )
}
