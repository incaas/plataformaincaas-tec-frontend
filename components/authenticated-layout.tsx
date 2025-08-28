"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"

export default function AuthenticatedLayout({
	children,
  user,
}: {
	children: React.ReactNode
  user?: { name?: string; email?: string; role?: string }
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="flex flex-col flex-1">
				<AppHeader user={user} />
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</div>
		</SidebarProvider>
	)
}