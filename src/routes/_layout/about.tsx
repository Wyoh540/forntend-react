import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/about")({
  component: RouteComponent,
  staticData: {
    breadcrumb: {
      title: "关于",
      display: true,
    },
  },
})

function RouteComponent() {
  return <div>Hello "/about"!</div>
}
