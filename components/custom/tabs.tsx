import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

const TabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
} | null>(null)

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("space-y-6", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn("border-b border-gray-200 overflow-x-auto", className)}>
      <nav className="flex min-w-max">
        {children}
      </nav>
    </div>
  )
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component")
  }

  const isActive = context.value === value

  return (
    <button
      onClick={() => context.onValueChange(value)}
                    className={cn(
          "py-3 px-10 border-b-2 font-medium text-base transition-colors whitespace-nowrap",
          isActive
            ? "border-[#1A73E8] text-[#1A73E8]"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
          "first:ml-8",
          className
        )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component")
  }

  if (context.value !== value) {
    return null
  }

  return (
    <div className={cn("space-y-6 pl-10", className)}>
      {children}
    </div>
  )
}
