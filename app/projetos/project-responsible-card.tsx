import { ProjectResponsible, Client } from "@/lib/types/projects"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Globe, Building2, Users } from "lucide-react"
import Image from "next/image"

interface ProjectResponsibleCardProps {
  responsible: ProjectResponsible
  roleColor: string
  roleLabel: string
  client?: Client
}

export function ProjectResponsibleCard({ 
  responsible, 
  roleColor, 
  roleLabel,
  client 
}: ProjectResponsibleCardProps) {
  return (
    <Card className="border border-gray-200 rounded-2xl group hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          {/* Header com nome e cargo */}
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{responsible.name}</h3>
            <span className={`px-3 py-1 ${roleColor} text-white text-xs font-semibold rounded-full`}>
              {responsible.role}
            </span>
          </div>
          
          {/* Descrição breve */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {responsible.description}
            </p>
          </div>

          {/* Informações do Cliente (se disponível) */}
          {client && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-semibold text-gray-800">Informações do Cliente</h4>
              </div>
              
              {/* Logo e Nome do Cliente */}
              <div className="flex items-center gap-3 mb-3">
                {client.logo && (
                  <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={client.logo} 
                      alt={`Logo ${client.name}`} 
                      width={32} 
                      height={32}
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-500">{client.secretariatAcronym} • {client.sectorAcronym}</p>
                </div>
              </div>

              {/* Secretaria e Setor */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">
                    <strong>Secretaria:</strong> {client.secretariat}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">
                    <strong>Setor:</strong> {client.sector}
                  </span>
                </div>
              </div>

              {/* Website */}
              {client.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-gray-500" />
                  <a 
                    href={client.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {client.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-3">
            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">{responsible.email}</span>
            </div>
            
            {/* Telefone/WhatsApp */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Image 
                  src="/whatsapp-icon.svg" 
                  alt="WhatsApp" 
                  width={16} 
                  height={16}
                  className="w-4 h-4"
                />
              </div>
              <span className="text-sm text-gray-600">{responsible.phone}</span>
            </div>
            
            {/* Discord */}
            {responsible.discord && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Image 
                    src="/discord-icon.svg" 
                    alt="Discord" 
                    width={16} 
                    height={16}
                    className="w-4 h-4"
                  />
                </div>
                <span className="text-sm text-gray-600">{responsible.discord}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <ArrowRight className="h-6 w-6 text-[#1A73E8] transition-all duration-200 group-hover:scale-110 group-hover:translate-x-1 group-hover:text-[#1557B0] group-active:text-[#0D47A1]" />
        </div>
      </CardContent>
    </Card>
  )
}
