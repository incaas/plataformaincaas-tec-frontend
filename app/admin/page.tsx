"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/custom/input"
import { Button } from "@/components/custom/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Grid3X3, ArrowRight } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  icon: string
  people: number
  modules: number
}

const projects: Project[] = [
  {
    id: "1",
    name: "SIGPRE",
    description: "O Sistema de Gerenciamento de Precatórios (SIGPRE)",
    icon: "SIGPRE",
    people: 5,
    modules: 12
  },
  {
    id: "2",
    name: "CERTIDÕES",
    description: "Sistema Unificado de Certidões",
    icon: "CERT",
    people: 2,
    modules: 3
  },
  {
    id: "3",
    name: "SIGAJUS",
    description: "Sistema Integrado de Gestão Administrativa do Judiciário",
    icon: "SIGA",
    people: 1,
    modules: 2
  },
  {
    id: "4",
    name: "NUPEJ",
    description: "Núcleo de Perícias Judiciais",
    icon: "NUPE",
    people: 0,
    modules: 0
  }
]

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
     
    </div>
  )
}


