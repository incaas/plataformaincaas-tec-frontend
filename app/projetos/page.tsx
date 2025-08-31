"use client"

import { useState } from "react"

import { Search, Plus } from "lucide-react"
import { Project, ProjectFilters, ProjectStatus } from "@/lib/types/projects"
import { mockProjects, filterOptions } from "./projects-data"
import { Button } from "@/components/custom/button"
import { SimpleSelect } from "@/components/custom/select"
import { ProjectCard } from "./project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/custom/tabs"


const statusTabs: ProjectStatus[] = [
  { id: "ativo", label: "Ativos", count: mockProjects.filter(p => p.status === "ativo").length },
  { id: "desenvolvimento", label: "Desenvolvimento", count: mockProjects.filter(p => p.status === "desenvolvimento").length },
  { id: "inativo", label: "Inativos", count: mockProjects.filter(p => p.status === "inativo").length }
]

export default function ProjetosPage() {
  const [activeTab, setActiveTab] = useState("ativo")
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<ProjectFilters>({
    client: "",
    sector: "",
    requester: "",
    devs: ""
  })

  const filteredProjects = mockProjects.filter(project => {
    const matchesStatus = project.status === activeTab
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClient = !filters.client || project.client === filters.client
    const matchesSector = !filters.sector || project.sector === filters.sector
    const matchesRequester = !filters.requester || project.requester === filters.requester
    const matchesDevs = !filters.devs || 
      (filters.devs === "1-3" && project.devs >= 1 && project.devs <= 3) ||
      (filters.devs === "4-6" && project.devs >= 4 && project.devs <= 6) ||
      (filters.devs === "7+" && project.devs >= 7)

    return matchesStatus && matchesSearch && matchesClient && matchesSector && matchesRequester && matchesDevs
  })



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a]">Projetos</h1>
        <Button className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Criar Projeto
        </Button>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {statusTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                {tab.count}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full lg:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 lg:gap-3 w-full lg:w-auto">
          <SimpleSelect
            value={filters.client}
            onValueChange={(value) => setFilters(prev => ({ ...prev, client: value }))}
            placeholder="Cliente"
            options={filterOptions.client.map(client => ({ value: client, label: client }))}
            className="w-full sm:w-48 lg:w-52"
          />
          <SimpleSelect
            value={filters.sector}
            onValueChange={(value) => setFilters(prev => ({ ...prev, sector: value }))}
            placeholder="Setor"
            options={filterOptions.sector.map(sector => ({ value: sector, label: sector }))}
            className="w-full sm:w-48 lg:w-52"
          />
          <SimpleSelect
            value={filters.requester}
            onValueChange={(value) => setFilters(prev => ({ ...prev, requester: value }))}
            placeholder="Demandante"
            options={filterOptions.requester.map(req => ({ value: req, label: req }))}
            className="w-full sm:w-48 lg:w-52"
          />
          <SimpleSelect
            value={filters.devs}
            onValueChange={(value) => setFilters(prev => ({ ...prev, devs: value }))}
            placeholder="Devs"
            options={filterOptions.devs.map(dev => ({ value: dev, label: dev }))}
            className="w-full sm:w-48 lg:w-52"
          />
        </div>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
         {filteredProjects.map((project) => (
           <ProjectCard
             key={project.id}
             project={project}
           />
         ))}
       </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-400 text-2xl">📋</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros ou criar um novo projeto.</p>
        </div>
      )}
      </Tabs>
    </div>
  )
}
