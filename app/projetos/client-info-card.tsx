import { Client } from "@/lib/types/projects"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Globe, Building2, Users, Calendar, Save } from "lucide-react"
import Image from "next/image"

interface ClientInfoCardProps {
  client: Client
}

export function ClientInfoCard({ client }: ClientInfoCardProps) {
 

  return (
    <Card className="border border-gray-200 rounded-2xl group hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          {/* Header com logo e nome */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 bg-[#1A73E8] text-white text-xs font-semibold rounded-full">
                  Cliente
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {client.description}
            </p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Secretaria</p>
                <p className="text-xs text-gray-600">{client.secretariat}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Setor</p>
                <p className="text-xs text-gray-600">{client.sector}</p>
              </div>
            </div>
          </div>

          {/* Website */}
          {client.website && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-gray-600" />
              </div>
              <a 
                href={client.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {client.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-4">
          <ArrowRight className="h-6 w-6 text-[#1A73E8] transition-all duration-200 group-hover:scale-110 group-hover:translate-x-1 group-hover:text-[#1557B0] group-active:text-[#0D47A1]" />
        </div>
      </CardContent>
    </Card>
  )
}
