"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface ProjectNavigationProps {
  projectName?: string
  currentPage: string
  projectId?: string
}

export function ProjectNavigation({ projectName, currentPage, projectId }: ProjectNavigationProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <Link href="/projetos" className="hover:text-gray-900 transition-colors">
        Projetos
      </Link>
      
      {projectName && projectId && (
        <>
          <ChevronRight className="h-4 w-4" />
          <Link 
            href={`/projetos/${projectId}`} 
            className="hover:text-gray-900 transition-colors"
          >
            {projectName}
          </Link>
        </>
      )}
      
      {currentPage && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{currentPage}</span>
        </>
      )}
    </div>
  )
}
