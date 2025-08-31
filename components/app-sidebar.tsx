"use client"

import { FolderOpen, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

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
} from "@/components/ui/sidebar"

const menuItems = [
  { 
    title: "Projetos", 
    url: "/projetos", 
    icon: FolderOpen
  },
  { 
    title: "Clientes", 
    url: "/admin/clients", 
    icon: Users
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="bg-[#F0F4F9] border-none">
      <SidebarHeader className="bg-[#F0F4F9] border-none">
        <div className="flex items-center gap-2 px-2 py-2 h-12">
         
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#F0F4F9] border-none">
        <SidebarGroup className="bg-[#F0F4F9] border-none">
          <SidebarGroupContent className="bg-[#F0F4F9] border-none">
            <SidebarMenu className="bg-[#F0F4F9] border-none">
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} className="bg-[#F0F4F9] border-none">
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive} 
                        className="border-none "
                      >
                        <Link 
                          href={item.url} 
                          className={`flex items-center  justify-between w-full px-8 py-6 transition-all duration-200 ${
                            isActive 
                              ? '!bg-[#C5D4EC] !text-black shadow-sm rounded-full' 
                              : 'bg-transparent text-gray-700 hover:bg-[#F0F4F9]/80 rounded-lg'
                          }`}
                          style={isActive ? { backgroundColor: '#C5D4EC', color: '#000000', borderRadius: '9999px' } : {}}
                        >
                        <div className="flex items-center gap-3 ">
                            <item.icon 
                              className={`h-5 w-5 ${
                                isActive ? 'text-black' : 'text-gray-600'
                              }`}
                              style={isActive ? { color: '#000000' } : {}}
                            />
                            <span 
                              className={`font-medium ${
                                isActive ? 'text-black' : 'text-gray-700'
                              }`}
                              style={isActive ? { color: '#000000' } : {}}
                            >
                              {item.title}
                            </span>
                          </div>
                       </Link>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#F0F4F9] border-none">
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image 
                src="/logo-incaas.svg" 
                alt="IncaaS" 
                width={32} 
                height={32} 
                className="w-8 h-8"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">IncaaS</p>
              <p className="text-xs text-gray-600">Versão 0.0.1</p>
            </div>
          </div>
     
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
