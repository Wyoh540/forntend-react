import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./styles.css"
import { Toaster } from "@/components/ui/sonner.tsx"
import reportWebVitals from "./reportWebVitals.ts"
import { routeTree } from "./routeTree.gen.ts"
import { client } from "@/client/client.gen.ts"

// 请求拦截器
client.instance.interceptors.request.use((config) => {
  config.headers.set({
    Authorization: "Bearer " + localStorage.getItem("access_token") || "",
  })
  return config
})

// 响应拦截器
client.instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.status === 403) {
      localStorage.removeItem("access_token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById("app")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </QueryClientProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
