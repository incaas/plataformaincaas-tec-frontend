"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/custom/button"
import { useSidebar } from "@/components/ui/sidebar"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AppHeader({ user }: { user?: { name?: string; email?: string; role?: string } }) {
  const { toggleSidebar } = useSidebar()

  const getUserInitials = (name?: string) => {
    if (!name) return "U"
    const parts = name.trim().split(/\s+/)
    const first = parts[0]?.[0] ?? ""
    const last = parts[parts.length - 1]?.[0] ?? ""
    return (first + last).toUpperCase() || "U"
  }

  const getDisplayName = (name?: string, email?: string) => {
    if (name && name.trim().length > 0) return name.toUpperCase()
    return (email || "Usuário").toUpperCase()
  }

  const getLabelByRole = (role?: string) => {
    if (!role) return null

    switch (role) {
      case "MASTER":
        return <span className="text-xs bg-incaas text-white px-2 py-1 rounded-md capitalize">{role.toUpperCase()}</span>
      case "OPERADOR":
        return <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-md capitalize">{role.toUpperCase()}</span>
      default:
        return null
    }
  }

  if (!user) return null

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F0F4F9] backdrop-blur supports-[backdrop-filter]:bg-[#F0F4F9] border-none">
      <div className="flex h-14 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2 hover:bg-[#F0F4F9]/80 border-none"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Alternar menu</span>
        </Button>

        {/* Logo à esquerda */}
        <div className="flex-1">
          <Image 
            src="/logo_horizontal.svg" 
            alt="IncaaS" 
            width={200} 
            height={45} 
            className="h-9 w-auto"
          />
        </div>

        {/* Informações do usuário */}
        <div className="hidden sm:flex items-center gap-3 mr-4">
          {getLabelByRole(user.role)}
          <div className="w-px h-4 bg-gray-300"></div>
          <span className="text-sm font-medium text-gray-800">
            Olá, <strong>{getDisplayName(user.name, user.email)}</strong>
          </span>
        </div>
        
        {/* Role apenas para mobile */}
        <div className="sm:hidden mr-4">
          {getLabelByRole(user.role)}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-[#F0F4F9]/80 border-none">
                <Avatar className="h-8 w-8">
                                     <AvatarFallback className="bg-incaas text-white">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium"><strong>{getDisplayName(user.name, user.email)}</strong></p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div className="w-full flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sistema sem autenticação</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
} 