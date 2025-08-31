import { Project } from "@/lib/types/projects"
import { Users, Grid } from "lucide-react"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8 hover:shadow-md transition-shadow cursor-pointer h-64 md:h-72 w-full flex flex-col"
      onClick={onClick}
    >
      <div className="mb-6 flex-1">
        <div className="flex-shrink-0 mb-4">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={`${project.name} Logo`}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          ) : (
            <Image
              src="/logo-cinza.svg"
              alt="Incaas Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2">
            {project.name}
          </h3>
          <p className="text-sm text-gray-600 leading-tight">
            {project.description}
          </p>
        </div>
      </div>

      {/* Project Stats and Arrow */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                <Users className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600 font-medium">
                  {project.devs}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Desenvolvedores</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                <Grid className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600 font-medium">
                  {project.team}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Módulos</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <svg width="20" height="19" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.88375 2.63282L13 6.74906H0.5V9.24906H13L8.88375 13.3653L10.6513 15.1328L16.0175 9.76656C16.4862 9.29774 16.7495 8.66197 16.7495 7.99906C16.7495 7.33615 16.4862 6.70038 16.0175 6.23157L10.6513 0.865314L8.88375 2.63282Z" fill="#1A73E8"/>
        </svg>
      </div>
    </div>
  )
}
