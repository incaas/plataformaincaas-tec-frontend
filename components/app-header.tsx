"use client"

import { Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
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
    if (name && name.trim().length > 0) return name
    return email || "Usuário"
  }

  const getLabelByRole = (role?: string) => {
    if (!role) return null

    switch (role) {
      case "MASTER":
        return <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md capitalize">{role.toUpperCase()}</span>
      case "OPERADOR":
        return <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-md capitalize">{role.toUpperCase()}</span>
      default:
        return null
    }
  }

  if (!user) return null

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } finally {
      window.location.href = '/login'
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-2"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Alternar menu</span>
        </Button>

        <div className="flex-1" />

        <div className="mr-4">{getLabelByRole(user.role)}</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Olá, {getDisplayName(user.name, user.email)}
              </span>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{getDisplayName(user.name, user.email)}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <div className="w-full flex items-center gap-2">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
} 