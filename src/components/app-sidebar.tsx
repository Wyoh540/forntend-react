import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { NavUser } from "@/components/nav-user"
import useAuth from "@/hooks/use-auth"
import { NavMain } from "@/components/nav-main"
import { ChevronRight, Folder, SquareTerminal } from "lucide-react"

// This is sample data.
export const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      children: [
        {
          title: "数据表",
          icon: SquareTerminal,
          url: "/datatable",
        },
        {
          title: "文件上传",
          url: "/file",
        },
        {
          title: "关于",
          url: "/about",
        },
      ],
    },
    // {
    //   title: "菜单",
    //   url: "#",
    //   items: [
    //     {
    //       title: "一级菜单",
    //       url: "/menu",
    //       items: [
    //         {
    //           title: "二级菜单",
    //           url: "/menu/submenu",
    //         },
    //       ],
    //     },
    //   ],
    // },
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

// function Tree({ item }: { item: any[] }) {
//   const [subItem, ...items] = Array.isArray(item) ? item : [item]
//   if (!items.length) {
//     return (
//       <Link to={item.url}>
//         {({ isActive }) => {
//           return (
//             <SidebarMenuButton isActive={isActive}>
//               {item.title}
//             </SidebarMenuButton>
//           )
//         }}
//       </Link>
//     )
//   }
//   return (
//     <SidebarMenuItem>
//       <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
//         <CollapsibleTrigger asChild>
//           <SidebarMenuButton>
//             <ChevronRight className="transition-transform" />
//             <Folder />
//             {item.title}
//           </SidebarMenuButton>
//         </CollapsibleTrigger>
//         <CollapsibleContent>
//           <SidebarMenuSub>
//             {item.children.map((subItem, index) => (
//               <Tree key={index} item={subItem} />
//             ))}
//           </SidebarMenuSub>
//         </CollapsibleContent>
//       </Collapsible>
//     </SidebarMenuItem>
//   )
// }
