import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"
import useAuth from "@/hooks/use-auth"
import { NavMain, type itemsType } from "@/components/nav-main"
import { SquareTerminal, File, BadgeAlert } from "lucide-react"

interface sidebarDataType {
  versions: string[]
  navMain: itemsType[]
  user: {
    name: string
    email: string
    avatar: string
  }
}

// This is sample data.
export const data: sidebarDataType = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      isActive: true,
      children: [
        {
          title: "数据表",
          icon: SquareTerminal,
          url: "/datatable",
        },
        {
          title: "文件上传",
          icon: File,
          url: "/file",
        },
        {
          title: "关于",
          icon: BadgeAlert,
          url: "/about",
        },
      ],
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user: currentUser } = useAuth()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <NavMain items={data.navMain} />
      </SidebarContent>
      {currentUser && (
        <SidebarFooter>
          <NavUser user={currentUser} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  )
}
